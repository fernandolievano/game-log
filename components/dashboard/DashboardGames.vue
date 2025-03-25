<template>
  <section class="w-full container mx-auto py-4 md:py-8 px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 items-start gap-4">
      <template v-if="loading">
        <DashboardGamesSkeleton v-for="i in 20" :key="i" :style="`animation-delay: ${i * 0.1}s`" />
      </template>
      <template v-else>
        <DashboardGamesCard v-for="game in steamStore.games" :appid="game.appid"
          :image="`https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/header.jpg`" :name="game.name"
          :playtime="game.playtime_forever" :key="game.appid" />
      </template>
    </div>
  </section>
</template>

<script lang="ts" setup>
import DashboardGamesCard from '@/components/dashboard/DashboardGamesCard.vue';
import DashboardGamesSkeleton from '@/components/dashboard/DashboardGamesSkeleton.vue';
import { useSteamStore } from '@/stores/steam';

const steamStore = useSteamStore();
const message = ref('Games not loaded yet!');
const noGamesFound = computed(() => steamStore.games.length <= 1);
const loading: boolean = computed(() => steamStore.gameLoading);
</script>