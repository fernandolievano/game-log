<template>
  <button
    class="w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 flex items-center justify-center text-current"
    aria-label="Log out" title="Log out" @click="handleLogout">
    <LogOut />
  </button>
</template>

<script lang="ts" setup>
import { LogOut } from 'lucide-vue-next';
import { useUserStore } from '@/stores/user';
const { logout } = useUserStore();
const handleLogout = () => {
  logout();
};
</script>