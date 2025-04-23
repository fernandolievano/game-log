<template>
  <main class="page-class">
    <div class="flex xl:hidden justify-end">
      <AppButton class="ml-auto max-w-fit" @click="goBack">
        <ArrowLeft />
      </AppButton>
    </div>
    <template v-if="game && gameStats">
      <div class="relative shadow shadow-[#1b2838] border-2 border-[#1b2838] bg-[#1b2838] rounded-2xl">
        <img :src="game.background" class="absolute z-0 w-full h-full inset-0 object-cover rounded-2xl">

        <div class="w-full h-full bg-transparent backdrop-blur-sm rounded-2xl px-4 py-4 xl:py-8 xl:px-8">
          <GameHeader :game="game" :game-stats="gameStats" />
          <GameDetails :game="game" :game-stats="gameStats" />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="h-full py-4 px-4 w-full">
        <h2 class="text-center text-2xl text-white">
          You don't own this game or it doesn't exists.
        </h2>
      </div>
    </template>
  </main>
</template>

<script setup lang="ts">
import { useSteamStore } from '@/stores/steam';
import GameHeader from '@/components/game/GameHeader.vue';
import GameDetails from '@/components/game/GameDetails.vue';
import { ArrowLeft } from 'lucide-vue-next';

definePageMeta({
  middleware: ['steam']
});

const steamStore = useSteamStore();
const route = useRoute();
const { appid } = route.params;

const { data, status } = await useFetch('/api/steam/game', {
  query: {
    appid
  }
});

const game = computed(() => {
  if (data.value && data.value.game && typeof appid === 'string') {
    return data.value.game;
  }

  return null;
});

const gameStats = typeof appid === 'string' && steamStore.selectedGame
  ? steamStore.selectedGame(parseInt(appid))
  : null;

const router = useRouter();
const goBack = () => {
  router.back();
};
</script>