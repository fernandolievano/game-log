import { deleteCookie } from 'h3';

export default defineEventHandler(async (event) => {
  deleteCookie(event, 'access_token', { path: '/' });
  return { message: 'Logged out' };
});