import { useUserStore } from '@/stores/user';

export const useAuthService = () => {
  const userStore = useUserStore();

  const fetchUser = async () => {
    try {
      const { data, error } = await $fetch('/api/auth/user');

      if (error) {
        throw new Error(error);
      }
      if (data && data.user) {
        userStore.setUser(data.user);
      }
      navigateTo('/');

      return {
        data,
        error: false,
        message: 'User data retrieved successfully!'
      };
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
  const setSession = async (hash: string) => {
    try {
      const params = new URLSearchParams(hash.slice(1));

      // Now we can get individual parameters
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');

      const { data, error } = await $fetch('/api/auth/session', {
        method: 'post',
        body: {
          accessToken,
          refreshToken,
        }
      });

      if (error) {
        throw new Error(error);
      }

      return {
        error: false,
        data,
        message: 'Session retrieved!'
      };
    } catch (err) {
      console.error('Session failed at service:', err); // Log actual error for debugging
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
    fetchUser,
    setSession
  };
};