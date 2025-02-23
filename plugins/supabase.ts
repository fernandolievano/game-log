import { createClient } from '@supabase/supabase-js';
import { useUserStore } from '@/stores/user';

export default defineNuxtPlugin(() => {
  const supabaseUrl = useRuntimeConfig().public.supabaseUrl as string;
  const supabaseKey = useRuntimeConfig().public.supabaseKey as string;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const userStore = useUserStore();

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
      userStore.user = session?.user ?? null;
      userStore.persistUser();
    } else if (event === 'SIGNED_OUT') {
      userStore.user = null;
      userStore.persistUser();
    }
  });

  return {
    provide: {
      supabase
    }
  };
});