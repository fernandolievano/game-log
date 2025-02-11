<template>
  <section class="p-4">
    <SigninForm />
  </section>
</template>

<script lang="ts" setup>
import SigninForm from '@/components/auth/SigninForm.vue';

definePageMeta({
  layout: 'auth',
});
useHead({
  title: 'Create account - GameLog'
});
</script>
