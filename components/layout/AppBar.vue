<template>
  <div class="fixed top-0 left-0 w-full py-2 px-4 xl:rounded-xl h-20 z-50">
    <div class="flex justify-between items-center h-full w-full gap-2 relative">
      <!-- menu actions -->
      <AppButtonBar ref="menuButtonRef" data-test-id="menu-button" class="xl:hidden border-none bg-white dark:bg-black"
        @click="openMenu">
        <Menu />
      </AppButtonBar>

      <div class="w-fit bg-white dark:bg-black py-2 px-4 rounded-full">
        <nuxt-link to="/" data-test-id="logo-link"
          class="font-mono text-2xl xl:text-3xl font-black tracking-wider my-0 py-0"
          @click="scrollUp">GameLog</nuxt-link>
      </div>
      <!-- menu actions -->

      <!-- theme actions -->
      <AppButtonBar class="ml-auto bg-white dark:bg-black" aria-label="Change theme" data-test-id="theme-button"
        title="Change theme" @click="changeTheme">
        <AppLoading v-if="!isMounted" data-test-id="loading-theme-button" />
        <span v-else>
          <Sun v-if="theme === 'dark'" />
          <Moon v-else />
        </span>
      </AppButtonBar>
      <!-- theme actions -->

      <AppBarUser />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Menu, Sun, Moon } from 'lucide-vue-next';
import { useTheme } from '@/composables/useTheme';
import { useUiStore } from '@/stores/ui';
import AppBarUser from '@/components/layout/AppBarUser.vue';

const menuButtonRef = ref<HTMLElement | null>(null);
const { theme, setTheme } = useTheme();
const { openMenu } = useUiStore();

const changeTheme = () => {
  setTheme(theme.value === 'dark' ? 'light' : 'dark');
};
const scrollUp = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});
</script>