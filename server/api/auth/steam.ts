import { setCookie } from 'h3';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const redirectUri = `${config.app.domain}/api/steam/callback`;

  const authUrl = new URL('https://steamcommunity.com/openid/login');
  authUrl.searchParams.append('openid.ns', 'http://specs.openid.net/auth/2.0');
  authUrl.searchParams.append('openid.mode', 'checkid_setup');
  authUrl.searchParams.append('openid.return_to', redirectUri);
  authUrl.searchParams.append('openid.realm', config.app.domain);
  authUrl.searchParams.append('openid.identity', 'http://specs.openid.net/auth/2.0/identifier_select');
  authUrl.searchParams.append('openid.claimed_id', 'http://specs.openid.net/auth/2.0/identifier_select');

  return sendRedirect(event, authUrl.toString());
});

