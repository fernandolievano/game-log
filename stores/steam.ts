import { defineStore } from 'pinia';
import type { SteamPlayer, SteamGame } from '@/interfaces/steam';

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
    setOwnedGames(games: SteamGame[], game_count: number) {
      this.games = games;
      this.game_count = game_count;
      this.gameLoading = false;
    }
  }
});