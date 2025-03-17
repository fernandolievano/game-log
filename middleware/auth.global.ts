import { defineNuxtRouteMiddleware, navigateTo } from '#app';
import { useUserStore } from '@/stores/user';
import { useSteamStore } from '@/stores/steam';
import { useAuthService } from '@/services/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authService = useAuthService();
  const hash = to.hash;

  // Check access_token and refresh token are in the url
  if (hash) {
    // If they exists, save them into cookies
    await authService.setSession(hash);
  }

  const userCookie = useCookie('user');
  const userStore = useUserStore();
  const steamStore = useSteamStore();

  if (userCookie.value) {
    const parsedUser = typeof userCookie.value === 'string'
      ? JSON.parse(userCookie.value) // If the cookie is a string, parse it into an object
      : userCookie.value; // If it's already an object, no need to parse
    userStore.setUser(parsedUser);
  } else {
    await userStore.fetchUser();
  }

  const isAuthenticated = userStore.user != null; // check if user is available on store
  const isAuthPage = /^\/(login|register)([?#].*)?$/.test(to.path);

  if (!isAuthenticated && !isAuthPage) {
    console.log('❌ User not logged in, redirecting to login');
    return navigateTo('/login', { replace: true });
  }

  if (isAuthenticated && isAuthPage) {
    console.log('✅ User authenticated, redirecting to home');
    // fetch steam data
    await steamStore.getPlayerSummary();
    return navigateTo('/', { replace: true });
  }

  if (isAuthenticated && to.path === '/logout') {
    console.log('👋 User authenticated, logging out...');
    await userStore.logout();
    return navigateTo('/login', { replace: true });
  }
});
