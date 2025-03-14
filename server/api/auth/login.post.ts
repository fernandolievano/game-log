import { useSupabase } from '@/utils/supabase';
import { setCookie } from 'h3';

interface BodyLogin {
  email: string;
  password: string;
}

export default defineEventHandler(async (event) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const body: BodyLogin = await readBody(event);
  const supabase = useSupabase();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: body.email,
      password: body.password
    });

    if (error) {
      console.error('Login failed at backend:', error.message);
      throw new Error(error.message);
    }

    const cookieOptions = {
      httpOnly: true,
      maxAge: data.session.expires_in,
      path: '/',
      sameSite: true,
      secure: isProduction,
    };

    const userJSON = JSON.stringify(data.user);

    setCookie(event, 'access_token', data.session.access_token, cookieOptions);
    setCookie(event, 'refresh_token', data.session.refresh_token, cookieOptions);
    setCookie(event, 'user', userJSON, cookieOptions)

    return { ok: true, data, error: null };
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