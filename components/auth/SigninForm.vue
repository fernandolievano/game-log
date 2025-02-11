<template>
  <div class="w-full max-w-[500px] mx-auto px-4 py-8 xl:px-8 xl:py-16 flex flex-col gap-4">
    <h1 class="text-4xl text-center px-2">Create account</h1>

    <div class="flex flex-col gap-4 items-center justify-center px-2 pt-4">
      <OAuthButton provider="google" />
      <OAuthButton provider="github" />

      <h3 class="text-2xl text-center text-gray-two pt-4">
        OR
      </h3>
    </div>

    <form class="w-full px-2 py-0">
      <AppInputText name="username" :required="true" />
      <AppInputEmail :required="true" />
      <AppInputPassword :required="true" />
      <AppButton>Submit</AppButton>
    </form>
  </div>
</template>

<script lang="ts" setup>
import OAuthButton from '@/components/auth/OAuthButton.vue';
</script>