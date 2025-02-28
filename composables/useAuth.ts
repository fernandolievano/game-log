import type { AuthResponse, OAuthResponse } from '@supabase/supabase-js';
import { useAuthService } from '@/services/auth';

export const useAuth = () => {
  const { $supabase } = useNuxtApp();
  const { loginUser } = useAuthService();
  const isLoading = ref(false);
  const errorMessage = ref<string | null>(null);

  async function handleAuthRequest(authFunc: () => Promise<AuthResponse | OAuthResponse>) {
    isLoading.value = true;
    errorMessage.value = null;

    try {
      const { error } = await authFunc();
      if (error) throw new Error(error.message);
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

  const loginUserOAuth = (provider: 'google' | 'github') =>
    handleAuthRequest(() => $supabase.auth.signInWithOAuth({ provider }));

  const login = async (email: string, password: string) => {
    isLoading.value = true;
    errorMessage.value = null;

    try {
      const { error, message } = await loginUser(email, password);
      if (error) throw new Error(message);
      console.log(message); // show succesful message
    } catch (err) {
      if (err instanceof Error) {
        errorMessage.value = err.message;
      } else {
        errorMessage.value = 'An unexpected error occurred.';
      }
    } finally {
      isLoading.value = false;
    }
  };

  return {
    registerUser,
    login,
    loginUserOAuth,
    errorMessage,
    isLoading,
    $supabase,
  };
};