<template>
  <div class="w-full max-w-[500px] mx-auto px-4 py-8 flex flex-col gap-8">
    <h1 class="text-6xl text-center px-2">{{ title }}</h1>

    <!-- OAuth Buttons -->
    <div class="flex flex-col gap-4 items-center justify-center px-2">
      <AppButton @click="connectWithSteam" class="uppercase max-w-[400px] mx-auto">
        <span class="flex items-center justify-center gap-2 text-xs md:text-base">
          {{ shouldRegister ? 'Sign Un' : 'Sign In' }} with Steam
          <IconSteam class="w-6" />
        </span>
      </AppButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconSteam from '@/components/svg/IconSteam.vue';

const props = defineProps<{
  title: string;
  shouldRegister: boolean;
}>();

const config = useRuntimeConfig();
const connectWithSteam = () => {
  window.location.href = `${config.app.domain}/api/auth/steam`;
};
</script>