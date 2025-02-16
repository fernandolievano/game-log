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

    <form @submit.prevent="handleForm" class="w-full px-2 py-0">
      <AppInputEmail v-model="form.email" :errors="errors.email" :required="true" />
      <AppInputPassword v-model="form.password" :errors="errors.password" :required="true" />
      <AppButton :disabled="isLoading">
        {{ isLoading ? 'Sending...' : 'Submit' }}
      </AppButton>

      <div v-if="errorMessage" class="py-8 px-0 w-full">
        <div class="rounded-lg border-2 border-pink-900 bg-pink-700 text-white px-6 py-4">
          <p class="font-bold">{{ errorMessage }}</p>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { z, ZodError } from 'zod';
import OAuthButton from '@/components/auth/OAuthButton.vue';
import { useAuth } from '@/composables/useAuth';

const {
  isLoading,
  registerUser,
  errorMessage
} = useAuth();
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password should be at least 6 characters.')
});
type FormType = z.infer<typeof formSchema>;
const form = ref<FormType>({
  email: '',
  password: ''
});
const errors = ref<Partial<Record<keyof FormType, string[]>>>({});

const validate = () => {
  try {
    formSchema.parse(form.value);
    errors.value = {};
  } catch (err) {
    if (err instanceof ZodError) {
      errors.value = err.formErrors.fieldErrors;
      console.log('Errores', errors.value);
    }
  }
};

const handleForm = async () => {
  validate();

  if (Object.keys(errors.value).length === 0) {
    try {
      console.log('submitted form!', form.value);

      await registerUser(form.value.email, form.value.password);

      form.value = {
        email: '',
        password: ''
      };
    } catch (error) {
      alert(error);
    }
  } else {
    console.log('form not submitted');
  }
}

</script>