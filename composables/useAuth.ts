import type { AuthResponse } from '@supabase/supabase-js';
import { useRouter } from 'vue-router';

export const useAuth = () => {
  const { $supabase } = useNuxtApp();
  const router = useRouter();
  const isLoading = ref(false);
  const errorMessage = ref<string | null>(null);

  const registerUser = async (email: string, password: string) => {
    isLoading.value = true;
    errorMessage.value = null;

    try {
      const { error, data }: AuthResponse = await $supabase.auth.signUp({
        email,
        password
      });

      if (error) return (errorMessage.value = error.message);

      console.log('User registered:', data); // ! remove later
      await router.push({ path: '/', query: { source: 'register' } });
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
    errorMessage,
    isLoading,
  };
};