<template>
  <div
    class="min-h-screen dark:bg-black dark:text-white bg-white text-black font-poppins p-4 pt-20 xl:p-8 xl:pt-20 transition-colors">
    <NuxtLoadingIndicator />
    <!-- navbar -->
    <AppBar />
    <!-- navbar -->

    <!-- aside -->
    <AppMenu />
    <!-- aside -->

    <!-- content -->
    <NuxtPage />
    <!-- content -->
  </div>
</template>

<script setup lang="ts">
import AppBar from '@/components/layout/AppBar.vue';
import AppMenu from '@/components/layout/AppMenu.vue';

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
</script>
