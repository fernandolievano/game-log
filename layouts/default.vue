<template>
  <Suspense>
    <template #default>
      <div v-if="!userStore.loading" class="min-h-screen w-full p-0 m-0 bg-gray-one text-white font-poppins">
        <NuxtLoadingIndicator />
        <!-- navbar -->
        <!-- navbar -->
        <!-- aside -->
        <!-- aside -->
        <!-- content -->
        <NuxtPage />
        <!-- content -->

        <div class="py-8 text-center">
            <button class="py-3 px-8 bg-gradient-to-br from-blue-500 to-purple-400 text-white rounded-lg cursor-pointer transition-transform hover:scale-110" @click="userStore.logout">LOGOUT TESTING
          </button>
        </div>
      </div>
    </template>

    <template #fallback>
      <div class="loading-screen">
        Loading... {{ userStore.loading }}
      </div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';

useHead({
  title: 'GameLog'
});
const userStore = useUserStore();
onBeforeMount(async () => {
  // if (userStore.user != null) {
  //   navigateTo('/');
  // }
  userStore.fetchUser();
});
</script>
