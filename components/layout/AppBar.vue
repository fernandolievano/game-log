<template>
  <div class="fixed top-0 left-0 xl:relative w-full py-2 px-4 xl:rounded-xl h-20 xl:h-16">
    <div class="flex justify-between items-center h-full w-full gap-2 relative">
      <!-- menu actions -->
      <AppButtonBar class="xl:hidden border-none">
        <Menu />
      </AppButtonBar>
      <!-- menu actions -->

      <!-- theme actions -->
      <AppButtonBar class="ml-auto" aria-label="Change theme" title="Change theme" @click="changeTheme">
        <AppLoading v-if="!isMounted" />
        <span v-else>
          <Sun v-if="theme === 'dark'" />
          <Moon v-else />
        </span>
      </AppButtonBar>
      <!-- theme actions -->

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
          class="w-fit flex items-center justify-start absolute right-0 -bottom-12 xl:-bottom-14" aria-label="Log out"
          title="Log out" @click="handleLogout">
          <LogOut /> <span class="text-center text-sm pl-2">Log Out</span>
        </AppButtonBar>
      </transition>
      <!-- user actions -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Menu, Sun, Moon, LogOut } from 'lucide-vue-next';
import { useUserStore } from '@/stores/user';
import { useSteamStore } from '@/stores/steam';
import { useTheme } from '@/composables/useTheme';

const { theme, setTheme } = useTheme();
const changeTheme = () => {
  setTheme(theme.value === 'dark' ? 'light' : 'dark');
};

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

const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});
</script>