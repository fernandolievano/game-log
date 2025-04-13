import { useSteamService } from '@/services/steam';
import { useSteamStore } from '@/stores/steam';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { ssrContext } = useNuxtApp();
  const steamService = useSteamService();
  const steamStore = useSteamStore();
  const steamidCookie = useCookie('steamid');

  if (steamidCookie.value) {
    if (ssrContext) {
      console.log('🍪 Steam cookie server side: ', steamidCookie.value);
      console.log('🎮 Getting Steam data server side...');
    } else {
      console.log('🍪 Steam cookie client side: ', steamidCookie.value);
      console.log('🎮 Getting Steam data client side...');
    }
    const { data: summaryData } = await steamService.fetchPlayerSummary(steamidCookie.value);
    const { data: gamesData } = await steamService.fetchOwnedGames(steamidCookie.value);

    if (summaryData) {
      steamStore.setPlayerSummary(summaryData.players[0]);
    }
    if (gamesData) {
      steamStore.setOwnedGames(gamesData.games, gamesData.game_count);
    }
  }
});