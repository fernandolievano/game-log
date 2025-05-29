<template>
  <section class="p-4 flex items-center justify-center">
    <AuthForm title="Welcome Gamer!" :should-register="false" />
  </section>
</template>

<script lang="ts" setup>
import AuthForm from '@/components/auth/AuthForm.vue';

definePageMeta({
  layout: 'auth',
});
useHead({
  title: 'Log In - GameLog'
});
</script>