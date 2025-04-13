<template>
  <header
    class="w-full z-10 relative flex flex-col lg:flex-row items-center justify-center lg:items-stretch lg:justify-start">
    <img :src="game.header_image" :alt="game.name" class="mx-auto object-cover rounded-2xl">

    <div
      class="w-full min-h-full max-w-[450px] lg:max-w-full text-white lg:px-8 flex flex-col items-start justify-start gap-4">
      <h3 class="pt-4 lg:pt-0 text-center font-bold tracking-wider text-3xl lg:text-left lg:text-4xl">
        {{ game.name }}
      </h3>

      <p class="text-sm">
        {{ game.short_description }}
      </p>

      <div
        class="w-full flex gap-4 justify-start items-end mt-auto px-4 py-4 mb-0 bg-transparent backdrop-blur-md rounded-2xl shadow">
        <div class="flex flex-col items-start gap-1 pr-2">
          <span class="text-xs text-gray-two">Release Date</span>
          <span class="text-sm font-semibold">
            {{ game.release_date.date }}
          </span>
        </div>

        <div class="flex flex-row items-center gap-2 text-gray-two">
          <span v-for="genre in game.genres" class="text-xs py-1 px-2 bg-[#1b2838] rounded-full" :key="genre.id">
            {{ genre.description }}
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import type { SteamGameProp } from '@/interfaces/steam';

const props = defineProps<{
  game: SteamGameProp;
}>();
</script>