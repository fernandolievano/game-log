import { parse } from 'url';
import { setCookie } from 'h3';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const isProduction = config.app.env === 'production';
  const { query } = parse(getRequestURL(event).toString(), true);

  if (!query['openid.claimed_id']) {
    return sendRedirect(event, '/?error=steam_login_failed');
  }

  const claimedId = Array.isArray(query['openid.claimed_id'])
    ? query['openid.claimed_id'][0]
    : query['openid.claimed_id'];

  const steamId = claimedId?.split('/').pop() ?? '';

  if (steamId) {
    setCookie(event, 'steamid', steamId, {
      httpOnly: true,
      path: '/',
      secure: isProduction,
      sameSite: 'lax',
    });
    console.log('🎮 --> SteamID:', steamId);
  }

  return sendRedirect(event, '/'); // ← steamid cookie is now set correctly
});
