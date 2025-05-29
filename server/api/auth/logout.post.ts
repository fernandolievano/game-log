import { deleteCookie } from 'h3';

export default defineEventHandler(async (event) => {
	deleteCookie(event, 'steamid', { path: '/' });
	return { message: 'Logged out' };
});
