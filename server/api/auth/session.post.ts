import { setCookie } from 'h3';

export default defineEventHandler(async (event) => {
  return { message: 'Session persisted' };
});