import { z, ZodError } from 'zod';

export const useAuthForm = () => {
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'Password should be at least 6 characters.')
  });

  type FormType = z.infer<typeof formSchema>;

  const formData = ref<FormType>({
    email: '',
    password: ''
  });

  const formErrors = ref<Partial<Record<keyof FormType, string[]>>>({});

  const validateForm = async () => {
    try {
      formSchema.parse(formData.value);
      formErrors.value = {};
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        formErrors.value = err.formErrors.fieldErrors;
        console.error('Errores', formErrors.value);
      }
      throw err;
    }
  };

  return {
    formSchema,
    formData,
    formErrors,
    validateForm,
  };
};