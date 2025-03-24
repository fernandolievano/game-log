import { defineStore } from 'pinia';
import type { SteamPlayer, SteamGame } from '@/interfaces/steam';

export const useSteamStore = defineStore('steam', {
  state: () => ({
    player: null as SteamPlayer | null,
    games: [] as SteamGame[],
    game_count: 0
  }),
  actions: {
    setPlayerSummary(player: SteamPlayer) {
      this.player = player;
    },
    setOwnedGames(games: SteamGame[], game_count: number) {
      this.games = games;
      this.game_count = game_count;
    }
  }
});