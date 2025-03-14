import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

export const useSupabase = (): SupabaseClient => {
  const config = useRuntimeConfig();

  if (!config.public.supabaseUrl || !config.public.supabaseKey) {
    throw new Error('Supabase URL and Key are required.');
  }

  return createClient(config.public.supabaseUrl, config.public.supabaseKey);
};
