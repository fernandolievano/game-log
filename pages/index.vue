<template>
  <main class="page-class">
    <header v-if="!steamIsLoaded" class="px-4 py-2 flex flex-col items-center justify-center h-full">
      <AppButton @click="connectWithSteam" class="uppercase max-w-[400px] mx-auto">
        <span class="flex items-center justify-center gap-2 text-xs md:text-base">
          Connect with Steam
          <IconSteam class="w-6" />
        </span>
      </AppButton>
    </header>

    <DashboardGames v-if="steamIsLoaded" />
  </main>
</template>

<script lang="ts" setup>
import IconSteam from '@/components/svg/IconSteam.vue';
import DashboardGames from '@/components/dashboard/DashboardGames.vue';
import { useSteamStore } from '@/stores/steam';

const steamStore = useSteamStore();
const steamIsLoaded = computed(() => !steamStore.playerLoading && !steamStore.gameLoading);
const config = useRuntimeConfig();
const connectWithSteam = () => {
  window.location.href = `${config.app.domain}/api/auth/steam`;
};
</script>