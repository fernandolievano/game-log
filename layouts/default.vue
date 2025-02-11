<template>
  <div class="min-h-screen w-full p-0 m-0 bg-gray-one text-white font-poppins">
    <NuxtLoadingIndicator />
    <!-- navbar -->
    <!-- navbar -->
    <!-- aside -->
    <!-- aside -->
    <!-- content -->
    <slot />
    <!-- content -->
  </div>
</template>

<script setup>
useHead({
  title: 'GamingLog'
});
</script>