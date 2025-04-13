<template>
  <main class="page-class">
    <template v-if="game">
      <div
        class="relative px-4 py-4 xl:py-8 xl:px-8 shadow shadow-[#1b2838] border-2 border-[#1b2838] bg-[#1b2838] rounded-2xl">
        <img :src="game.background" class="absolute z-0 w-full h-full inset-0 object-cover rounded-2xl">

        <GameHeader :game="game" />
      </div>
    </template>
    <template></template>
  </main>
</template>

<script setup lang="ts">
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
</script>