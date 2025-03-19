<template>
  <section class="w-full container mx-auto py-4 md:py-8 px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 items-start gap-4">
      <!-- game card -->
      <div v-for="game in steamStore.games" class="w-full max-w-[400px] mx-auto flex flex-col justify-start"
        :key="game.appid">
        <div class="relative">
          <img class="w-full h-auto object-cover object-center rounded-2xl border border-day dark:border-night"
            :src="`https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/header.jpg`" :alt="`${game.name} Cover`"
            loading="lazy">
        </div>

        <div class="px-2 py-2 w-full flex justify-between items-start gap-4">
          <h3 class="text-sm font-semibold font-poppins tracking-wider max-w-[80%]">{{ game.name }}</h3>
          <span
            class="bg-purple-500 dark:bg-pink-700 text-white px-2 py-1 rounded-2xl text-xs font-sans flex-nowrap text-nowrap">
            {{ hoursPlayed(game.playtime_forever) }} hours
          </span>
        </div>
      </div>
      <!-- game card -->
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useSteamStore } from '@/stores/steam';
const steamStore = useSteamStore();
const message = ref('Games not loaded yet!');
const noGamesFound = computed(() => steamStore.games.length <= 1);

const hoursPlayed = (totalMinutes: number) => Math.round(totalMinutes / 60);

onBeforeMount(async () => {
  if (noGamesFound.value) {
    await steamStore.getOwnedGames();
  } else {
    message.value = 'Games not loaded or you don\'t own any game yet.';
  }
});
</script>