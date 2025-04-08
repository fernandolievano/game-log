<template>
  <div
    class="min-h-screen dark:bg-black dark:text-white bg-white text-black font-poppins p-4 pt-20 xl:p-8 xl:pt-20 transition-colors">
    <NuxtLoadingIndicator />
    <!-- navbar -->
    <AppBar />
    <!-- navbar -->

    <!-- aside -->
    <AppMenu />
    <!-- aside -->

    <!-- content -->
    <NuxtPage />
    <!-- content -->
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { useSteamStore } from '@/stores/steam';
import { useSteamService } from '@/services/steam';
import AppBar from '@/components/layout/AppBar.vue';
import AppMenu from '@/components/layout/AppMenu.vue';

useHead({
  title: 'GameLog',
  script: [
    {
      children: `(function() {
        const theme = localStorage.getItem('theme') || 'dark';
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      })()`
    }
  ]
});

const userStore = useUserStore();
const steamStore = useSteamStore();
const steamService = useSteamService();

const { status, data } = useAsyncData('steam', async () => {
  console.log('🎮 Getting Steam data...');
  const steamidCookie = useCookie('steamid');

  if (steamidCookie.value) {
    const { data: summaryData } = await steamService.fetchPlayerSummary();
    if (summaryData) {
      steamStore.setPlayerSummary(summaryData.players[0]);
    }
  }
  if (steamidCookie.value && steamStore.games.length === 0) {
    const { data: gamesData } = await steamService.fetchOwnedGames();
    if (gamesData) {
      steamStore.setOwnedGames(gamesData.games, gamesData.game_count);
    }
  }

  return {
    games: steamStore.games,
    player: steamStore.player
  };
});
</script>
