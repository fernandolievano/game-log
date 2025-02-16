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
      <AppInputEmail v-model="form.email" :errors="errors.email" :required="true" />
      <AppInputPassword v-model="form.password" :errors="errors.password" :required="true" />
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
import { z, ZodError } from 'zod';
import { useAuth } from '@/composables/useAuth';

const props = defineProps<{
  title: string;
  shouldRegister: boolean;
}>();

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