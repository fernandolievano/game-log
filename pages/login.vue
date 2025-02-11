<template>
  <section class="p-4 flex items-center justify-center">
    <LoginForm />
  </section>
</template>

<script lang="ts" setup>
import LoginForm from '@/components/auth/LoginForm.vue';

definePageMeta({
  layout: 'auth',
});
useHead({
  title: 'Log In - GameLog'
});
</script>
