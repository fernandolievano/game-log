import { useUserStore } from '@/stores/user';
import { defineNuxtRouteMiddleware, useNuxtApp } from '#app';
import Cookies from 'universal-cookie';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();
  const { ssrContext } = useNuxtApp();
  const cookies = new Cookies(ssrContext?.event?.node?.req?.headers?.cookie || '');

  const userFromCookie = cookies.get('user');

  console.log('🚀 Servidor:', !!ssrContext);
  if (!userStore.user) {
    await userStore.fetchUser();
  }

  const user = userStore.user || userFromCookie;
  const pathIsAuth = to.path.startsWith('/login') || to.path.startsWith('/register');

  if (!user && !pathIsAuth) {
    console.log('❌ Usuario no autenticado, redirigiendo a login');
    return navigateTo('/login', { replace: true });
  }

  if (user && pathIsAuth) {
    console.log('✅ Usuario autenticado, redirigiendo a home');
    return navigateTo('/', { replace: true });
  }

  if (user && to.path === '/logout') {
    console.log('👋 Usuario autenticado, cerrando sesión...');
    await userStore.logout();
    return navigateTo('/login', { replace: true });
  }
});
