<template>
  <div class="w-full max-w-[500px] mx-auto px-4 py-8 flex flex-col gap-8">
    <h1 class="text-6xl text-center px-2">{{ title }}</h1>

    <div class="flex flex-col gap-4 items-center justify-center px-2">
      <OAuthButton provider="google" :should-register="shouldRegister" />
      <OAuthButton provider="github" :should-register="shouldRegister" />
    </div>

    <h3 class="w-full text-2xl text-center text-gray-two flex gap-8 items-center justify-center px-2">
      <span class="w-full h-[1px] bg-gray-two"></span>
      <span>or</span>
      <span class="w-full h-[1px] bg-gray-two"></span>
    </h3>

    <form @submit.prevent="handleForm" class="w-full flex flex-col gap-4 px-2">
      <AppInputEmail v-model="formData.email" :errors="formErrors.email" :required="true" />
      <AppInputPassword v-model="formData.password" :errors="formErrors.password" :required="true" />
      <AppButton :disabled="isLoading">
        {{ isLoading ? 'Sending...' : 'Submit' }}
      </AppButton>

      <div v-if="errorMessage" class="pt-4 px-0 w-full">
        <div class="rounded-lg border border-pink-300 bg-pink-700 text-white px-6 py-4">
          <p class="font-bold flex items-center gap-2 justify-center">
            <CircleX />
            {{ errorMessage }}
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import OAuthButton from '@/components/auth/OAuthButton.vue';
import { CircleX } from 'lucide-vue-next';
import { useAuth } from '@/composables/useAuth';
import { useAuthForm } from '@/composables/useAuthForm';

const props = defineProps<{
  title: string;
  shouldRegister: boolean;
}>();
const {
  isLoading,
  registerUser,
  errorMessage
} = useAuth();
const {
  formData,
  formErrors,
  validateForm
} = useAuthForm();

const handleForm = async () => {
  try {
    await validateForm();
    await registerUser(formData.value.email, formData.value.password);

    formData.value = {
      email: '',
      password: ''
    };
  } catch (err: unknown) {
    console.error(err);
  }
}

</script>