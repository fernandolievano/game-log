import type { AuthResponse, OAuthResponse } from '@supabase/supabase-js';
import { useUserStore } from '@/stores/user';

export const useAuth = () => {
  const { $supabase } = useNuxtApp();
  const isLoading = ref(false);
  const errorMessage = ref<string | null>(null);
  const { fetchUser } = useUserStore();

  const registerUser = async (email: string, password: string) => {
    isLoading.value = true;
    errorMessage.value = null;

    try {
      const { error, data }: AuthResponse = await $supabase.auth.signUp({
        email,
        password
      });
      if (error) return (errorMessage.value = error.message);
      await fetchUser();
      navigateTo('/');
    } catch (err: unknown) {
      console.error('Unexpected error during registration:', err);
      if (err instanceof Error) {
        errorMessage.value = err.message;
      } else {
        errorMessage.value = 'An unexpected error ocurred.';
      }
    } finally {
      isLoading.value = false;
    }
  };
  const loginUser = async (email: string, password: string) => {
    isLoading.value = true;
    errorMessage.value = null;

    try {
      const { error, data }: AuthResponse = await $supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) return (errorMessage.value = error.message);
      await fetchUser();
      navigateTo('/');
    } catch (err: unknown) {
      console.error('Unexpected error during registration:', err);
      if (err instanceof Error) {
        errorMessage.value = err.message;
      } else {
        errorMessage.value = 'An unexpected error ocurred.';
      }
    } finally {
      isLoading.value = false;
    }
  };
  const loginUserOAuth = async (provider: 'google' | 'github') => {
    isLoading.value = true;
    errorMessage.value = null;

    try {
      const { data, error }: OAuthResponse = await $supabase.auth.signInWithOAuth({
        provider
      });

      if (error) return (errorMessage.value = error.message);
      await fetchUser();
      navigateTo('/');
    } catch (err: unknown) {
      console.error('Unexpected error during registration:', err);
      if (err instanceof Error) {
        errorMessage.value = err.message;
      } else {
        errorMessage.value = 'An unexpected error ocurred.';
      }
    } finally {
      isLoading.value = false;
    }
  };

  return {
    registerUser,
    loginUser,
    loginUserOAuth,
    errorMessage,
    isLoading,
    $supabase
  };
};