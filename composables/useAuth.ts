import type { AuthResponse, OAuthResponse } from '@supabase/supabase-js';
import { useUserStore } from '@/stores/user';

export const useAuth = () => {
  const { $supabase } = useNuxtApp();
  const isLoading = ref(false);
  const errorMessage = ref<string | null>(null);
  const { fetchUser } = useUserStore();

  async function handleAuthRequest(authFunc: () => Promise<AuthResponse | OAuthResponse>) {
    isLoading.value = true;
    errorMessage.value = null;

    try {
      const { error } = await authFunc();
      if (error) throw new Error(error.message);
      await fetchUser();
      navigateTo('/');
    } catch (err: unknown) {
      console.error('Authentication error:', err);
      errorMessage.value = err instanceof Error ? err.message : 'An unexpected error occurred.';
    } finally {
      isLoading.value = false;
    }
  }

  const registerUser = (email: string, password: string) =>
    handleAuthRequest(() => $supabase.auth.signUp({ email, password }));

  const loginUser = (email: string, password: string) =>
    handleAuthRequest(() => $supabase.auth.signInWithPassword({ email, password }));

  const loginUserOAuth = (provider: 'google' | 'github') =>
    handleAuthRequest(() => $supabase.auth.signInWithOAuth({ provider }));

  return {
    registerUser,
    loginUser,
    loginUserOAuth,
    errorMessage,
    isLoading,
    $supabase,
  };
};