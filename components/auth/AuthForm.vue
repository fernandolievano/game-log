<template>
  <div class="w-full max-w-[500px] mx-auto px-4 py-8 flex flex-col gap-8">
    <h1 class="text-6xl text-center px-2">{{ title }}</h1>

    <!-- OAuth Buttons -->
    <div class="flex flex-col gap-4 items-center justify-center px-2">
      <OAuthButton provider="google" :should-register="shouldRegister" @click="handleOAuth('google')" />
      <OAuthButton provider="github" :should-register="shouldRegister" @click="handleOAuth('github')" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import OAuthButton from '@/components/auth/OAuthButton.vue';
import { useAuth } from '@/composables/useAuth';

const props = defineProps<{
  title: string;
  shouldRegister: boolean;
}>();

const { loginOAuth } = useAuth();
const handleOAuth = async (provider: 'google' | 'github') => {
  try {
    await loginOAuth(provider);
    navigateTo('/');
  } catch (err) {
    console.error(`OAuth login error: ${err}`);
  }
};
</script>