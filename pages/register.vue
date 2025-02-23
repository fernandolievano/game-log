<template>
  <section class="p-4 lg:p-8">
    <AuthForm title="Create Account" :should-register="true" />
  </section>
</template>

<script lang="ts" setup>
import SigninForm from '@/components/auth/AuthForm.vue';

definePageMeta({
  layout: 'auth',
});
useHead({
  title: 'Create account - GameLog'
});
</script>
