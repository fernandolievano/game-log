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

  const steamId = claimedId?.split('/').pop() ?? ''; // Asegura que nunca sea undefined

  // Guardar en una cookie solo si el steamId no está vacío
  if (steamId) {
    const cookieOptions = {
      httpOnly: false,
      path: '/',
      secure: isProduction,
    };
    console.log('🎮 SteamID:', steamId);
    setCookie(event, 'steamid', steamId, cookieOptions);
  }

  return sendRedirect(event, '/');
});