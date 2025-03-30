import { useSupabase } from '@/utils/supabase';
import { useUserStore } from '@/stores/user';

export default defineNuxtPlugin((nuxtApp) => {
  const supabase = useSupabase();
  const userStore = useUserStore();

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
      userStore.user = session?.user ?? null;
    } else if (event === 'SIGNED_OUT') {
      userStore.user = null;
    }
  });

  return {
    provide: {
      supabase
    }
  };
});
