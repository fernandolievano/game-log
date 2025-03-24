import type { SteamPlayer, SteamGame } from '@/interfaces/steam';
interface SteamSummaryResponse {
  data: {
    players: SteamPlayer[];
  };
  error: any;
  ok: boolean;
}
interface SteamOwnedGamesResponse {
  data: {
    game_count: number;
    games: SteamGame[];
  };
  error: any;
  ok: boolean;
}

export const useSteamService = () => {
  const fetchPlayerSummary = async () => {
    try {
      const { data, error, ok } = await $fetch<SteamSummaryResponse>('/api/steam/summary', {
        credentials: 'include'
      });

      if (error) throw new Error(error);

      return {
        data,
        ok,
        error
      };
    } catch (err) {
      console.error('❌ Error at service Summary Player:', err);

      if (err instanceof Error) {
        return {
          error: true,
          data: null,
          message: err.message
        };
      }
      return {
        error: true,
        data: null,
        message: 'An unexpected error occurred.',
      };
    }
  };
  const fetchOwnedGames = async () => {
    try {
      const { data, error, ok } = await $fetch<SteamOwnedGamesResponse>('/api/steam/games', {
        credentials: 'include'
      });

      if (error) throw new Error(error);

      return {
        data,
        ok,
        error
      };
    } catch (err) {
      console.error('❌ Error at service Games Owned:', err);

      if (err instanceof Error) {
        return {
          error: true,
          data: null,
          message: err.message
        };
      }
      return {
        error: true,
        data: null,
        message: 'An unexpected error occurred.',
      };
    }
  };

  return {
    fetchPlayerSummary,
    fetchOwnedGames
  };
};