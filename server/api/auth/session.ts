import { useSupabase } from '@/utils/supabase';
import { setCookie } from 'h3';

export default defineEventHandler(async (event) => {
  const supabase = useSupabase();
  const { data: authSession, error } = await supabase.auth.getSession();

  if (error || !authSession?.session?.access_token) {
    return { error: 'Session retrieval failed' };
  }

  setCookie(event, 'access_token', authSession.session.access_token, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 1 day
  });

  return { message: 'Session persisted' };
});