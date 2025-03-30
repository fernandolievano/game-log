<template>
  <div class="fixed top-0 left-0 w-full py-2 px-4 xl:rounded-xl h-20 z-50">
    <div class="flex justify-between items-center h-full w-full gap-2 relative">
      <!-- menu actions -->
      <AppButtonBar class="xl:hidden border-none bg-white dark:bg-black">
        <Menu />
      </AppButtonBar>

      <div class="w-fit bg-white dark:bg-black py-2 px-4 rounded-full">
        <nuxt-link to="/" class="font-mono text-2xl xl:text-3xl font-black tracking-wider my-0 py-0"
          @click="scrollUp">GameLog</nuxt-link>
      </div>
      <!-- menu actions -->

      <!-- theme actions -->
      <AppButtonBar class="ml-auto bg-white dark:bg-black" aria-label="Change theme" title="Change theme"
        @click="changeTheme">
        <AppLoading v-if="!isMounted" />
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
import AppBarUser from '@/components/layout/AppBarUser.vue';

const { theme, setTheme } = useTheme();

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