<template>
  <article
    class="w-full text-white z-10 relative mt-8 py-4 xl:py-8 grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-[450px] lg:max-w-full mx-auto bg-transparent backdrop-blur-md rounded-2xl shadow">
    <!--  -->
    <section class="w-full py-4">
      <h4 class="text-xl lg:text-2xl tracking-wider font-bold">Available on</h4>
      <div class="grid gap-2 items-center grid-cols-1 w-full pt-4">
        <div v-if="game.platforms.windows" class="text-left flex items-center gap-2 justify-start">
          <span class="text-green-500">
            <CheckSquare />
          </span>
          <span class="text-gray-two">Windows</span>
        </div>
        <div v-if="game.platforms.mac" class="text-left flex items-center gap-2 justify-start">
          <span class="text-green-500">
            <CheckSquare />
          </span>
          <span class="text-gray-two">Mac</span>
        </div>
        <div v-if="game.platforms.linux" class="text-left flex items-center gap-2 justify-start">
          <span class="text-green-500">
            <CheckSquare />
          </span>
          <span class="text-gray-two">Linux</span>
        </div>
      </div>
    </section>
    <!--  -->
    <section class="w-full py-4"></section>
    <!--  -->
    <section class="w-full py-4"></section>
    <!--  -->
    <section class="w-full py-4"></section>
    <!--  -->
  </article>
</template>

<script lang="ts" setup>
import type { SteamGame, SteamGameProp } from '@/interfaces/steam';
import { CheckSquare } from 'lucide-vue-next';
import IconLinux from '../svg/IconLinux.vue';

const props = defineProps<{
  game: SteamGameProp;
  gameStats: SteamGame;
}>();
</script>