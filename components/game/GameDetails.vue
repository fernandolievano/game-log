<template>
  <article
    class="w-full text-white z-10 relative mt-8 py-4 px-1 xl:py-8 grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-[450px] lg:max-w-full mx-auto">
    <!--  -->
    <section class="w-full py-4">
      <h4 class="text-xl lg:text-2xl tracking-wider font-bold">Available on</h4>
      <div class="flex gap-8 items-center w-full pt-4">
        <div v-if="game.platforms.windows" class="text-left flex items-center gap-2 justify-start relative group">
          <span>
            <AppIconWindows height="40px" width="40px" />
          </span>
          <span
            class="absolute bottom-full mb-1 left-full px-2 py-2 rounded-full rounded-bl-none bg-gradient-to-t from-black to-night text-white hidden group-hover:block text-xs">
            Windows
          </span>
        </div>
        <div v-if="game.platforms.mac" class="text-left flex items-center gap-2 justify-start relative group">
          <span>
            <AppIconApple height="40px" width="40px" />
          </span>
          <span
            class="absolute bottom-full mb-1 left-full px-2 py-2 rounded-full rounded-bl-none bg-gradient-to-t from-black to-night text-white hidden group-hover:block text-xs">
            Mac
          </span>
        </div>
        <div v-if="game.platforms.linux" class="text-left flex items-center gap-2 justify-start relative group">
          <span>
            <AppIconLinux height="40px" width="40px" />
          </span>
          <span
            class="absolute bottom-full mb-1 left-full px-2 py-2 rounded-full rounded-bl-none bg-gradient-to-t from-black to-night text-white hidden group-hover:block text-xs">
            Linux
          </span>
        </div>
      </div>
    </section>
    <!--  -->
    <section class="w-full py-4">
      <h4 class="text-xl lg:text-2xl tracking-wider font-bold">Supported Languages</h4>
      <p class="w-full pt-4 text-gray-two text-sm" v-html="game.supported_languages">
      </p>
    </section>
    <!--  -->
    <section class="w-full py-4">
      <div class="text-xl lg:text-2xl tracking-wider font-bold">Categories</div>
      <div class="flex gap-2 items-center text-gray-two pt-4 flex-wrap">
        <span v-for="category in game.categories"
          class="text-xs py-1 px-2 bg-[#1b2838] rounded-full cursor-default text-nowrap" :key="category.id">
          {{ category.description }}
        </span>
      </div>
    </section>
    <!--  -->
    <section class="w-full py-4" v-if="game.genres.length > 3">
      <div class="text-xl lg:text-2xl tracking-wider font-bold">All Genres</div>

      <div class="flex gap-2 items-center text-gray-two pt-4 flex-wrap">
        <span v-for="genre in game.genres"
          class="text-xs py-1 px-2 bg-[#1b2838] rounded-full cursor-default text-nowrap" :key="genre.id">
          {{ genre.description }}
        </span>
      </div>
    </section>
    <!--  -->
  </article>
</template>

<script lang="ts" setup>
import type { SteamGame, SteamGameProp } from '@/interfaces/steam';
import { CheckSquare } from 'lucide-vue-next';

const props = defineProps<{
  game: SteamGameProp;
  gameStats: SteamGame;
}>();
</script>