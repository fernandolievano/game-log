import { useUserStore } from '@/stores/user';

export const useAuthService = () => {
  const userStore = useUserStore();

  const fetchUser = async (shouldRedirect = false) => {
    try {
      const { data, error } = await $fetch('/api/auth/user');

      if (error) {
        throw new Error(error);
      }
      console.log(data);
      if (data != null) {
        userStore.setUser(data.user);
      }
      if (shouldRedirect) {
        navigateTo('/');
      }
    } catch (err) {
      console.error('Fetch user failed at service:', err); // Log actual error for debugging
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
  const registerUser = async (email: string, password: string) => {
    try {
      const { data, error } = await $fetch('/api/auth/register', {
        method: 'post',
        body: { email, password }
      });

      if (error) {
        throw new Error(error);
      }
      await fetchUser();
      return {
        error: false,
        data,
        message: 'User registered successfully!',
      };
    } catch (err) {
      console.error('Register failed at service:', err); // Log actual error for debugging
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
  const loginUser = async (email: string, password: string) => {
    try {
      const { data, error } = await $fetch('/api/auth/login', {
        method: 'post',
        body: { email, password }
      });

      if (error) {
        throw new Error(error);
      }
      await fetchUser();
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

  return {
    loginUser,
    registerUser,
    fetchUser
  };
};