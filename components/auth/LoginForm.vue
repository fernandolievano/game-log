<template>
  <div class="w-full max-w-[500px] mx-auto px-4 py-8 xl:px-8 xl:py-16 flex flex-col gap-4">
    <h1 class="text-4xl text-center px-2">Welcome back!</h1>
    <h4 class="text-lg text-center text-gray-two px-2">Please, enter your details</h4>

    <form @submit.prevent="handleForm" class="w-full px-2 py-0">
      <AppInputText v-model="form.username" name="username" :errors="errors.username" :required="true" />
      <AppInputPassword v-model="form.password" :errors="errors.password" :required="true" />
      <AppButton>Submit</AppButton>
    </form>

    <div class="flex flex-col gap-4 items-center justify-center px-2 pt-4">
      <h3 class="text-lg text-center text-gray-two">
        OR
      </h3>
      <OAuthButton provider="google" />
      <OAuthButton provider="github" />
    </div>
  </div>
</template>

<script lang="ts" setup>
// ? validations and error messages will be different when
// ? using backend to log in
import { z, ZodError } from 'zod';
import { useRouter } from 'vue-router';
import OAuthButton from '@/components/auth/OAuthButton.vue';

const router = useRouter();
const formSchema = z.object({
  username: z.string().min(3, 'Username should be at least 3 characters.'),
  password: z.string().min(5, 'Password should be at least 5 characters.')
});
type FormType = z.infer<typeof formSchema>;
const form = ref<FormType>({
  username: '',
  password: ''
});
const errors = ref<Partial<Record<keyof FormType, string[]>>>({});
  const validate = () => {
  try {
    const result = formSchema.parse(form.value);
    errors.value = {};
  } catch (err) {
    if (err instanceof ZodError) {
      errors.value = err.formErrors.fieldErrors;
      console.log('Errores', errors.value);
    }
  }
};
const handleForm = () => {
  validate();

  if (Object.keys(errors.value).length === 0) {
    console.log('submitted form!', form.value);
    router.push('/');
  } else {
    console.log('form not submitted');
  }
}
</script>