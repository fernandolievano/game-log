import { useAuthService } from '@/services/auth';

export const useAuth = () => {
  const { $supabase } = useNuxtApp();
  const { loginUser, registerUser, fetchUser } = useAuthService();
  const isLoading = ref(false);
  const errorMessage = ref<string | null>(null);


  const loginOAuth = async (provider: 'google' | 'github') => {
    isLoading.value = true;
    errorMessage.value = null;

    try {
      const { data, error } = await $supabase.auth.signInWithOAuth({ provider });
      if (error) throw new Error(error.message);
      await fetchUser();
      return;
    } catch (error) {
      console.error('OAuth Error: ', error);
    }

  };

  const login = async (email: string, password: string) => {
    isLoading.value = true;
    errorMessage.value = null;

    try {
      const { error, message } = await loginUser(email, password);
      if (error) throw new Error(message);
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
  const register = async (email: string, password: string) => {
    isLoading.value = true;
    errorMessage.value = null;

    try {
      const { error, message } = await registerUser(email, password);
      if (error) throw new Error(message);
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
    register,
    login,
    loginOAuth,
    errorMessage,
    isLoading,
    $supabase,
  };
};