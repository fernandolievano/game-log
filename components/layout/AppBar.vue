<template>
  <div class="relative top-0 left-0 w-full py-2 px-4 rounded-xl h-16">
    <div class="flex justify-between items-center h-full w-full gap-2">
      <h4 class="text-xl select-none">GameLog</h4>
      <AppButtonTheme class="ml-auto" />
      <AppButtonLogout />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
const { user } = useUserStore();
</script>