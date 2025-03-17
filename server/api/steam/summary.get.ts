import { getCookie } from 'h3';
import { SteamSummaryResponse } from '@/interfaces/steam';

export default defineEventHandler(async (event) => {
  const STEAM_KEY = process.env.STEAM_KEY || null;
  const STEAM_ID = getCookie(event, 'steamid');

  console.log('key:', STEAM_KEY);
  console.log('id:', STEAM_ID);
  if (STEAM_KEY && STEAM_ID) {
    try {
      const URL = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_KEY}&steamids=${STEAM_ID}`;
      const { response }: SteamSummaryResponse = await $fetch(URL);

      return {
        ok: true,
        data: response,
        error: null
      };
    } catch (error) {
      console.error('❌ ', error);
      return {
        ok: false,
        data: null,
        error
      };
    }
  } else {
    console.error('Missing API Key or Steam ID');
  }
});