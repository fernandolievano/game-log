import { useUserStore } from '@/stores/user';
import { defineNuxtRouteMiddleware, navigateTo } from '#app';

export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore();
  // Ensure user state is populated
  if (!userStore.user) {
    await userStore.fetchUser();
  }

  const isAuthenticated = !!userStore.user;
  const isAuthPage = ['/login', '/register'].includes(to.path);

  if (!isAuthenticated && !isAuthPage) {
    console.log('❌ user not logged in, redirecting to login');
    return navigateTo('/login', { replace: true });
  }

  if (isAuthenticated && isAuthPage) {
    console.log('✅ user authenticated, redirecting to home');
    return navigateTo('/', { replace: true });
  }

  if (isAuthenticated && to.path === '/logout') {
    console.log('👋 user authenticated, login out...');
    await userStore.logout();
    return navigateTo('/login', { replace: true });
  }
});