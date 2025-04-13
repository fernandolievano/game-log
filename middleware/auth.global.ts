import { defineNuxtRouteMiddleware, useNuxtApp } from '#app';
import { useAuthService } from '@/services/auth';
import { useSteamService } from '@/services/steam';
import { useUserStore } from '@/stores/user';
import { useSteamStore } from '@/stores/steam';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { ssrContext } = useNuxtApp();
  const authService = useAuthService();
  const steamService = useSteamService();
  const userStore = useUserStore();
  const steamStore = useSteamStore();

  /** OAuth login validations
   * - Check if access_token and refresh token are in the url (on a hash)
   * - If they exists, save them into cookies as well as user data.
   */
  if (to.hash) {
    const { data, message } = await authService.setSession(to.hash);

    console.log('ℹ️  hash validation:', message);

    if (data) {
      userStore.setUser(data.user);
    }
  }

  const userCookie = useCookie('user');
  const accessTokenCookie = useCookie('access_token');
  const steamidCookie = useCookie('steamid');

  /** Populate store as soon as possible
   * - If user cookie exists, populate store with it
   * - If not, fetch user data from backend
   */
  if (userCookie.value && !userStore.user) {

    const parsedUser = typeof userCookie.value === 'string'
      ? JSON.parse(userCookie.value) // If the cookie is a string, parse it into an object
      : userCookie.value; // If it's already an object, no need to parse

    console.log('ℹ️ got user from cookies');

    userStore.setUser(parsedUser);

  } else if (accessTokenCookie.value && !userStore.user) {

    const { data, message } = await authService.fetchUser();

    console.log('ℹ️ populating store', message);

    if (data) {
      userStore.setUser(data.user);
    }
  }

  /** Validations
   * If user is logged in, fetch user's steam data
   * Redirect based on url path and user session
   */
  const isAuthenticated = !!userStore.user;
  const isAuthRoute = to.path.startsWith('/login') || to.path.startsWith('/register');

  if (isAuthenticated && to.path === '/logout') {
    console.log('👋 User authenticated, logging out...');
    await userStore.logout();
    return navigateTo('/login', { replace: true });
  }
  if (isAuthenticated && steamidCookie.value) {
    if (ssrContext) {
      console.log('🎮 Getting Steam data server side...');
    } else {
      console.log('🎮 Getting Steam data client side...');
    }
    const { data: summaryData } = await steamService.fetchPlayerSummary();
    const { data: gamesData } = await steamService.fetchOwnedGames();

    if (summaryData) {
      steamStore.setPlayerSummary(summaryData.players[0]);
    }
    if (gamesData) {
      steamStore.setOwnedGames(gamesData.games, gamesData.game_count);
    }
  }
  if (!isAuthenticated && !isAuthRoute) {
    console.log('🔒 User not authenticated, redirecting to login...');
    return navigateTo('/login', { replace: true });
  }
  if (isAuthenticated && isAuthRoute) {
    console.log('🔓 User authenticated, redirecting to home...');
    return navigateTo('/', { replace: true });
  };
});