import { defineStore } from 'pinia';
import type { SteamPlayer, SteamGame } from '@/interfaces/steam';
import { useSteamService } from '@/services/steam';

export const useSteamStore = defineStore('steam', {
  state: () => ({
    player: null as SteamPlayer | null,
    games: [] as SteamGame[],
    game_count: 0
  }),
  actions: {
    async getPlayerSummary() {
      const { fetchPlayerSummary } = useSteamService();
      const response = await fetchPlayerSummary();

      if (response && response.ok) {
        this.player = response.data.players[0];
      }
    },
    async getOwnedGames() {
      const { fetchOwnedGames } = useSteamService();
      const response = await fetchOwnedGames();

      if (response && response.ok) {
        this.games = response.data.games;
        this.game_count = response.data.game_count;
      }
    }
  }
});