import type { SteamPlayer } from '@/interfaces/steam';

export const useSteamService = () => {
  const fetchPlayerSummary = async () => {
    interface SteamSummaryResponse {
      data: {
        players: SteamPlayer[];
      };
      error: any;
      ok: boolean;
    }
    try {
      const { data, error, ok }: SteamSummaryResponse = await $fetch('/api/steam/summary');

      if (error) throw new Error(error);
      console.log('data is: ', data);
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