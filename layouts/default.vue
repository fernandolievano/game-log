<template>
  <Suspense>
    <template #default>
      <div v-if="!userStore.loading"
        class="min-h-screen dark:bg-black dark:text-white bg-white text-black font-poppins p-4 pt-20 xl:p-8 transition-colors">
        <NuxtLoadingIndicator />
        <!-- navbar -->
        <AppBar />
        <!-- navbar -->

        <!-- aside -->
        <!-- aside -->

        <!-- content -->
        <NuxtPage />
        <!-- content -->
      </div>
    </template>

    <template #fallback>
      <div class="h-full flex justify-center items-center w-full">
        <AppLoading />
      </div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import AppBar from '@/components/layout/AppBar.vue';

useHead({
  title: 'GameLog',
  script: [
    {
      children: `(function() {
        const theme = localStorage.getItem('theme') || 'dark';
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      })()`
    }
  ]
});
const userStore = useUserStore();
</script>
