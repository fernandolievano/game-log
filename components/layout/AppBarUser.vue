<template>
  <div class="relative w-fit" v-if="player">
    <!-- user actions -->
    <AppButtonBar class="w-fit flex items-center justify-start"
      :class="[showPlayerWidget ? 'bg-day dark:bg-night' : 'bg-white dark:bg-black']" @click="handlePlayerWidget">
      <img v-if="player" class="rounded-full" :src="player.avatar" alt="Steam Avatar" loading="lazy">
      <AppLoading v-else />
      <span v-if="player" class="text-center text-sm pl-2">{{ player.personaname }}</span>
      <span v-else class="text-center text-sm pl-2"> Loading... </span>
    </AppButtonBar>

    <transition name="slide-fade" mode="out-in">
      <AppButtonBar v-if="player && showPlayerWidget"
        class="w-[110px] flex items-center justify-start absolute right-0 -bottom-14 bg-white dark:bg-black"
        aria-label="Log Out" title="Log Out" @click="handleLogout">
        <LogOut /> <span class="text-center text-xs pl-2">Log Out</span>
      </AppButtonBar>
    </transition>
    <!-- user actions -->
  </div>
  <div v-else class="relative w-fit">
    <AppButtonBar class="bg-white dark:bg-black" aria-label="Log Out" title="Log Out" @click="handleLogout">
      <LogOut />
    </AppButtonBar>
  </div>
</template>

<script lang="ts" setup>
import { LogOut } from 'lucide-vue-next';
import { useUserStore } from '@/stores/user';
import { useSteamStore } from '@/stores/steam';

const { logout } = useUserStore();
const { player } = useSteamStore();

const showPlayerWidget = ref<boolean>(false);

const handlePlayerWidget = () => {
  showPlayerWidget.value = !showPlayerWidget.value;
};
const handleLogout = () => {
  showPlayerWidget.value = false;
  logout();
};
</script>