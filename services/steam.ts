import type { SteamPlayer } from '@/interfaces/steam';
interface SteamSummaryResponse {
  data: {
    players: SteamPlayer[];
  };
  error: any;
  ok: boolean;
}

export const useSteamService = () => {
  const fetchPlayerSummary = async () => {

    try {
      const response = await $fetch<SteamSummaryResponse>('/api/steam/summary');
      const { data, error, ok } = response;

      if (error) throw new Error(error);
      return {
        data,
        ok,
        error
      };
    } catch (err) {
      console.error('Error at service Summary Player:', err);
    }
  };

  return {
    fetchPlayerSummary
  };
};