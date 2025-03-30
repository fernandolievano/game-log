import { deleteCookie } from 'h3';

export default defineEventHandler(async (event) => {
  deleteCookie(event, 'access_token', { path: '/' });
  deleteCookie(event, 'refresh_token', { path: '/' });
  deleteCookie(event, 'user', { path: '/' });
  deleteCookie(event, 'steamid', { path: '/' });
  return { message: 'Logged out' };
});