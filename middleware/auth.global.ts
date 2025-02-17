import { useUserStore } from '@/stores/user';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userCookies = useCookie('user');
  const user = userCookies.value;
  const userStore = useUserStore();

  console.log('user is: ', user);

  if (import.meta.server || !user) {
    await userStore.fetchUser();
  }
  if (!user && (to.path !== '/login' && to.path !== '/register')) {
    console.log('is not auth');
    return navigateTo('/login');
  }
  if (user != null && (to.path === '/login' || to.path === '/register')) {
    console.log('is auth');
    return navigateTo('/');
  }
});