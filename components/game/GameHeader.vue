<template>
  <header
    class="w-full z-10 relative flex flex-col lg:flex-row items-center justify-center lg:items-stretch lg:justify-start">
    <img :src="game.header_image" :alt="game.name" class="mx-auto object-cover rounded-2xl">

    <div
      class="w-full min-h-full max-w-[450px] lg:max-w-full text-white lg:px-8 flex flex-col items-start justify-start gap-4 overflow-auto">
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
          <span class="text-sm font-semibold flex items-center gap-1">
            <CalendarDays class="w-4" /> {{ game.release_date.date }}
          </span>
        </div>

        <div class="flex flex-col items-start gap-1 pr-2">
          <span class="text-xs text-gray-two">Playtime</span>
          <span class="text-sm font-semibold flex items-center gap-1">
            <Clock4 class="w-4" /> {{ playtime }} hours
          </span>
        </div>

        <div class="hidden 2xl:flex flex-row items-center gap-2 text-gray-two">
          <span v-for="genre in game.genres.slice(0, 3)"
            class="text-xs py-1 px-2 bg-[#1b2838] rounded-full cursor-default text-nowrap" :key="genre.id">
            {{ genre.description }}
          </span>
          <span v-if="game.genres.length > 3"
            class="text-xs py-1 px-2 bg-[#1b2838] rounded-full cursor-default text-nowrap">
            etc
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { Clock4, CalendarDays } from 'lucide-vue-next';
import type { SteamGame, SteamGameProp } from '@/interfaces/steam';

const props = defineProps<{
  game: SteamGameProp;
  gameStats: SteamGame;
}>();

const playtime = computed(() => Math.round(props.gameStats.playtime_forever / 60));
</script>