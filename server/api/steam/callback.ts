import { setCookie } from 'h3';
import { parse } from 'url';

export default defineEventHandler(async (event) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const { query } = parse(getRequestURL(event).toString(), true);

  if (!query['openid.claimed_id']) {
    return sendRedirect(event, '/?error=steam_login_failed');
  }

  const claimedId = Array.isArray(query['openid.claimed_id'])
    ? query['openid.claimed_id'][0]
    : query['openid.claimed_id'];

  const steamId = claimedId?.split('/').pop() ?? ''; // ensures steamId is a string

  if (steamId) {
    const cookieOptions = {
      httpOnly: false,
      path: '/',
      secure: isProduction,
      sameSite: true,
    };
    setCookie(event, 'steamid', steamId, cookieOptions);
    console.log('🎮 --> SteamID:', steamId);
  }

  return sendRedirect(event, '/');
});