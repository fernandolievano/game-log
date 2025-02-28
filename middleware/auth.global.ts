import { useUserStore } from '@/stores/user';
import { defineNuxtRouteMiddleware, navigateTo } from '#app';

export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore();
  const userCookie = useCookie('user');
  const accessTokenCookie = useCookie('access_token');

  // Check if the user cookie exists and is not empty
  if (userCookie.value) {
    // If the cookie is a string, parse it into an object
    const parsedUser = typeof userCookie.value === 'string'
      ? JSON.parse(userCookie.value)
      : userCookie.value; // If it's already an object, no need to parse

    userStore.setUser(parsedUser);
  }
  if (!userCookie.value && accessTokenCookie.value) {
    await userStore.fetchUser(accessTokenCookie.value);
  }

  const isAuthenticated = !!userStore.user;
  const isAuthPage = ['/login', '/register'].includes(to.path);

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
