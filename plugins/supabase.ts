import { createClient } from '@supabase/supabase-js';

export default defineNuxtPlugin(() => {
  const supabaseUrl = useRuntimeConfig().public.supabaseUrl as string;
  const supabaseKey = useRuntimeConfig().public.supabaseKey as string;
  const supabase = createClient(supabaseUrl, supabaseKey);

  return {
    provide: {
      supabase
    }
  };
});