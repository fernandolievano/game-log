<template>
  <div class="fixed top-0 left-0 xl:relative w-full py-2 px-4 xl:rounded-xl h-20 xl:h-16">
    <div class="flex justify-between items-center h-full w-full gap-2">
      <AppButtonBar class="xl:hidden border-none">
        <Menu />
      </AppButtonBar>

      <AppButtonBar
        class="ml-auto"
        aria-label="Change theme"
        title="Change theme"
        @click="changeTheme"
      >
        <LoaderCircle v-if="!isMounted" class="animate-spin" />
        <span v-else>
          <Sun v-if="theme === 'dark'" />
          <Moon v-else />
        </span>
      </AppButtonBar>

      <AppButtonBar
        aria-label="Log out"
        title="Log out"
        @click="handleLogout"
      >
        <LogOut />
      </AppButtonBar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LoaderCircle, Menu, Sun, Moon, LogOut } from 'lucide-vue-next';
import { useUserStore } from '@/stores/user';
import { useTheme } from '@/composables/useTheme';

const { theme, setTheme } = useTheme();
const changeTheme = () => {
  setTheme(theme.value === 'dark' ? 'light' : 'dark');
};

const { logout } = useUserStore();
const handleLogout = () => {
  logout();
};

const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});
</script>