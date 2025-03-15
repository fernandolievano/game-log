<template>
  <main>
    <section class="px-4 py-2 flex flex-col items-center justify-center h-full">
      <h2 class="text-2xl mb-8">
        Track your game stats with Steam API!
      </h2>
      <p v-if="steamId">Tu Steam ID: {{ steamId }}</p>
      <AppButton v-else @click="connectWithSteam" class="uppercase max-w-[400px] mx-auto">
        <span class="flex items-center justify-center gap-2 text-xs md:text-base">
          Connect with Steam
          <IconSteam class="w-6" />
        </span>
      </AppButton>
    </section>
  </main>
</template>

<script lang="ts" setup>
import IconSteam from '@/components/svg/IconSteam.vue';

const steamId = useCookie('steamid');
const connectWithSteam = () => {
  window.location.href = "http://localhost:3000/api/auth/steam";
};
</script>