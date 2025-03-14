import { defineNuxtRouteMiddleware, navigateTo } from '#app';
import { useUserStore } from '@/stores/user';
import { useAuthService } from '@/services/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authService = useAuthService();
  const hash = to.hash;

  // Check access_token and refresh token are in the url
  // and save them into cookies
  if (hash) {
    await authService.setSession(hash);
  }

  const userCookie = useCookie('user');
  const userStore = useUserStore();

  // Check if the user cookie exists and is not empty
  if (userCookie.value) {
    // If the cookie is a string, parse it into an object
    const parsedUser = typeof userCookie.value === 'string'
      ? JSON.parse(userCookie.value)
      : userCookie.value; // If it's already an object, no need to parse

    userStore.setUser(parsedUser);
  } else {
    await userStore.fetchUser();
  }

  const isAuthenticated = !!userStore.user;
  const isAuthPage = /^\/(login|register)([?#].*)?$/.test(to.path);

  /* Redirect Logic */
  if (!isAuthenticated && !isAuthPage) {
    console.log('❌ User not logged in, redirecting to login');
    return navigateTo('/login', { replace: true });
  }

  if (isAuthenticated && isAuthPage) {
    console.log('✅ User authenticated, redirecting to home');
    return navigateTo('/');
  }

  if (isAuthenticated && to.path === '/logout') {
    console.log('👋 User authenticated, logging out...');
    await userStore.logout();
    return navigateTo('/login', { replace: true });
  }
});
