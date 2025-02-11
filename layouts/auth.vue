<template>
  <div class="min-h-screen w-full p-0 m-0 bg-gray-two text-white font-poppins">
    <NuxtLoadingIndicator />
    <slot />
  </div>
</template>

<script setup>
useHead({
  title: 'GamingLog - Log In'
});
</script>