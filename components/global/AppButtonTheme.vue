<template>
  <button
    class="w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 flex items-center justify-center text-current"
    @click="changeTheme" aria-label="Change theme" title="Change theme">
    <LoaderCircle v-if="!isMounted" class="animate-spin" />
    <span v-else>
      <Sun v-if="theme === 'dark'" />
      <Moon v-else />
    </span>
  </button>
</template>

<script lang="ts" setup>
import { Sun, Moon, LoaderCircle } from 'lucide-vue-next';
import { useTheme } from '@/composables/useTheme';

const { theme, setTheme } = useTheme();
const isMounted = ref(false);
const changeTheme = () => {
  setTheme(theme.value === 'dark' ? 'light' : 'dark');
};
onMounted(() => {
  isMounted.value = true;
});
</script>