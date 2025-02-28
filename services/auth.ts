import { useUserStore } from '@/stores/user';

export const useAuthService = () => {
  const userStore = useUserStore();

  const loginUser = async (email: string, password: string) => {
    try {
      const { data, error } = await $fetch('/api/auth/login', {
        method: 'post',
        body: { email, password }
      });

      if (error) {
        throw new Error(error);
      }
      await userStore.fetchUser(data?.session.access_token);
      return {
        error: false,
        data,
        message: 'User logged in successfully!',
      };
    } catch (err) {
      console.error('Login failed at service:', err); // Log actual error for debugging
      if (err instanceof Error) {
        return {
          error: true,
          data: null,
          message: err.message
        };
      }
      return {
        error: true,
        data: null,
        message: 'An unexpected error occurred.',
      };
    }
  };

  const loginUserOAuth = async () => {

  };
  const registerUser = async () => {

  };

  return {
    loginUser,
    loginUserOAuth,
    registerUser
  };
};