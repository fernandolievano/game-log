import { z, ZodError } from 'zod';

export const useAuthForm = () => {
  // Define form validation schema
  const formSchema = z.object({
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string().min(6, { message: 'Password should be at least 6 characters.' })
  });

  type FormType = z.infer<typeof formSchema>;

  // Reactive form state
  const formData = ref<FormType>({ email: '', password: '' });

  // Reactive error state (shallowRef to optimize reactivity)
  const formErrors = shallowRef<Partial<Record<keyof FormType, string[]>>>({});

  // Validates the form and sets errors
  const validateForm = async (): Promise<boolean> => {
    try {
      formSchema.parse(formData.value);
      resetValidation(); // Clear errors if validation passes
      return true;
    } catch (err) {
      if (err instanceof ZodError) {
        formErrors.value = err.formErrors.fieldErrors;
        console.error('Validation errors:', formErrors.value);
      }
      return false;
    }
  };

  // Resets form fields
  const resetForm = () => {
    formData.value = { email: '', password: '' };
    resetValidation();
  };

  // Clears validation errors without resetting the form fields
  const resetValidation = () => {
    formErrors.value = {};
  };

  return {
    formSchema,
    formData,
    formErrors,
    validateForm,
    resetForm,
    resetValidation,
  };
};
