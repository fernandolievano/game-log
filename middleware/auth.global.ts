import { useSteamService } from '@/services/steam';
import { useSteamStore } from '@/stores/steam';

export default defineNuxtRouteMiddleware(
	async (to, from) => {
		const { ssrContext } = useNuxtApp();
		const steamService = useSteamService();
		const steamStore = useSteamStore();
		const steamidCookie = useCookie('steamid');

		/**
		 * Logout functionality
		 * */
		if (to.path === '/logout') {
			console.info(
				'👋 User authenticated, logging out...'
			);
			await steamStore.logout();
			return navigateTo('/login', { replace: true });
		}

		/**
		 * Check if the user is authenticated by checking the steamid cookie
		 */
		if (
			steamidCookie.value &&
			steamStore.playerLoading &&
			steamStore.gameLoading
		) {
			/**
			 * Redirect if user is already authenticated and tries to
			 * access the login page.
			 */
			if (to.path === '/login') {
				return navigateTo('/', { replace: true });
			}

			if (ssrContext) {
				console.info(
					'🎮 Getting Steam data server side...'
				);
			} else {
				console.info(
					'🎮 Getting Steam data client side...'
				);
			}

			const { data: summaryData } =
				await steamService.fetchPlayerSummary(
					steamidCookie.value
				);
			const { data: gamesData } =
				await steamService.fetchOwnedGames(
					steamidCookie.value
				);

			if (summaryData) {
				steamStore.setPlayerSummary(
					summaryData.players[0]
				);
			}
			if (gamesData) {
				steamStore.setOwnedGames(
					gamesData.games,
					gamesData.game_count
				);
			}
		} else {
			/**
			 * Redirect to /login if steamid cookie is not available
			 */

			if (
				!steamidCookie.value &&
				to.path !== '/login'
			) {
				console.info(
					'🔒 User not authenticated, redirecting to login...'
				);
				return navigateTo('/login', {
					replace: true
				});
			}
		}
	}
);
