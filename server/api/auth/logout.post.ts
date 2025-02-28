import { deleteCookie } from 'h3';

export default defineEventHandler(async (event) => {
  deleteCookie(event, 'access_token', { path: '/' });
  deleteCookie(event, 'refresh_token', { path: '/' });
  deleteCookie(event, 'user', { path: '/' });
  return { message: 'Logged out' };
});