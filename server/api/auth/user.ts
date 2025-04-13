import { useSupabase } from '@/utils/supabase';
import { getCookie, setCookie } from 'h3';

export default defineEventHandler(async (event) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const accessTokenCookie = getCookie(event, 'access_token') || undefined;
  const supabase = useSupabase();

  const cookies = parseCookies(event);
  console.log('ALL COOKIES user:', cookies); // <--

  try {
    const { data, error } = await supabase.auth.getUser(accessTokenCookie);

    if (error) {
      console.error('Fetch User failed at backend:', error.message);
      throw new Error(error.message);
    }

    console.log('successful log: ', data);

    const cookieOptions = {
      httpOnly: true,
      path: '/',
      secure: isProduction,
    };

    if (data.user) {
      console.log('save user on cookiesssss!');
      const userJSON = JSON.stringify(data.user);
      setCookie(event, 'user', userJSON, cookieOptions);
    }

    return { ok: true, data, error: null };
  } catch (err) {
    console.error('❌ error while getting user from supabase: ', err);
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