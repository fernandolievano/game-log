import { defineStore } from 'pinia';
import type {
	SteamPlayer,
	SteamGame
} from '@/interfaces/steam';

export const useSteamStore = defineStore('steam', {
	state: () => ({
		player: null as SteamPlayer | null,
		playerLoading: true,
		games: [] as SteamGame[],
		gameLoading: true,
		game_count: 0
	}),
	actions: {
		setPlayerSummary(player: SteamPlayer) {
			this.player = player;
			this.playerLoading = false;
		},
		setOwnedGames(
			games: SteamGame[],
			game_count: number
		) {
			// Filter out test and benchmark games
			this.games = games.filter((game) => {
				const name = game.name.toLowerCase();
				if (
					name.includes('test') ||
					name.includes('benchmark')
				) {
					return false;
				}
				return true;
			});

			this.game_count = this.games.length;
			this.gameLoading = false;
		},
		async logout() {
			try {
				await $fetch('/api/auth/logout', {
					method: 'POST'
				});

				navigateTo('/login', { replace: true });
			} catch (err) {
				console.error('Logout failed:', err);
			}
		}
	},
	getters: {
		mostPlayedGame: (state) => {
			if (state.games.length > 0) {
				return state.games.reduce(
					(prev, current) => {
						return prev.playtime_forever >
							current.playtime_forever
							? prev
							: current;
					}
				);
			}
			return null;
		},
		selectedGame: (state) => {
			if (state.games.length > 0) {
				return (appid: number) => {
					const game = state.games.find(
						(game) => game.appid === appid
					);
					if (game) {
						return game;
					}
					return null;
				};
			}

			return null;
		}
	}
});
