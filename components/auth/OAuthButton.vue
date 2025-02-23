<template>
  <button
    class="w-full max-w-[500px] py-3 px-5 flex items-center justify-center gap-2 border rounded-lg cursor-pointer transition-all text-black bg-white hover:bg-black hover:text-white hover:border-transparent dark:text-white dark:bg-black dark:hover:bg-white dark:hover:text-black duration-500">
    <span class="w-6">
      <component :is="selectedComponent" v-if="selectedComponent"></component>
    </span>
    {{ buttonCaption }} {{ providerName }}
  </button>
</template>

<script lang="ts" setup>
import IconGitHub from '@/components/svg/IconGitHub.vue';
import IconGoogle from '@/components/svg/IconGoogle.vue';

const props = defineProps<{
  provider: 'github' | 'google';
  shouldRegister: boolean;
}>();

const providerName = computed(() => ({
  google: 'Google',
  github: 'GitHub',
}[props.provider] || 'Undefined'));
const buttonCaption = computed (() => (
  props.shouldRegister ? `Sign up with` : `Sign in with`
))

const componentsMap = {
  github: IconGitHub,
  google: IconGoogle
};

const selectedComponent = computed(() => componentsMap[props.provider] || null);
</script>