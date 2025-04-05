<template>
  <section class="w-full container mx-auto pb-4 md:pb-8 px-4">
    <article class="w-full pb-16 transition-all">
      <template v-if="!loading && steamStore.mostPlayedGame">
        <DashboardGamesHeader
          :image="`https://cdn.akamai.steamstatic.com/steam/apps/${steamStore.mostPlayedGame.appid}/header.jpg`"
          :name="steamStore.mostPlayedGame.name" :playtime="steamStore.mostPlayedGame.playtime_forever" />
      </template>
      <template v-else>
        <DashboardGamesHeaderSkeleton />
      </template>
    </article>

    <article class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 items-start gap-4">
      <template v-if="loading">
        <DashboardGamesSkeleton v-for="i in 20" :key="i" :style="`animation-delay: ${i * 0.1}s`" />
      </template>
      <template v-else>
        <DashboardGamesCard v-for="game in steamStore.games" :appid="game.appid"
          :image="`https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/header.jpg`" :name="game.name"
          :playtime="game.playtime_forever" :key="game.appid" />
      </template>
    </article>
  </section>
</template>

<script lang="ts" setup>
import DashboardGamesCard from '@/components/dashboard/DashboardGamesCard.vue';
import DashboardGamesSkeleton from '@/components/dashboard/DashboardGamesSkeleton.vue';
import DashboardGamesHeaderSkeleton from '@/components/dashboard/DashboardGamesHeaderSkeleton.vue';
import { useSteamStore } from '@/stores/steam';

const steamStore = useSteamStore();
const loading = computed(() => steamStore.gameLoading);
</script>