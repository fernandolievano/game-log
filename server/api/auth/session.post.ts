import { useSupabase } from '@/utils/supabase';
import { setCookie } from 'h3';

interface BodySession {
  accessToken: string;
  refreshToken: string;
}

export default defineEventHandler(async (event) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const body: BodySession = await readBody(event);
  const supabase = useSupabase();

  try {
    const { data, error } = await supabase.auth.getUser(body.accessToken);

    console.log('SESSION AT BACKEND: ', data);

    if (error) {
      console.error('Session failed at backend:', error.message);
      throw new Error(error.message);
    }

    if (data.user) {
      const cookieOptions = {
        httpOnly: true,
        path: '/',
        sameSite: true,
        secure: isProduction,
      };
      const userJSON = JSON.stringify(data.user);
      setCookie(event, 'access_token', body.accessToken, cookieOptions);
      setCookie(event, 'refresh_token', body.refreshToken, cookieOptions);
      setCookie(event, 'user', userJSON, cookieOptions);
    }

    return { ok: true, error: null, data };
  } catch (err) {
    if (err instanceof Error) {
      return {
        ok: false,
        data: null,
        error: err.message
      };
    }
    return {
      ok: false,
      data: null,
      error: 'An unexpected error occurred. Please try again later.'
    };
  }
});