import { defineStore } from 'pinia';
import type { SteamPlayer } from '@/interfaces/steam';
import { useSteamService } from '@/services/steam';

export const useSteamStore = defineStore('steam', {
  state: () => ({
    player: null as SteamPlayer | null,
  }),
  actions: {
    async getPlayerSummary() {
      const { fetchPlayerSummary } = useSteamService();
      const response = await fetchPlayerSummary();

      if (response) {
        this.player = response.data.players[0];
      }
    }
  }
});