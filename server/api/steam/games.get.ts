import { getCookie } from 'h3';
import type { SteamOwnedGamesResponse } from '~/interfaces/steam';

export default defineEventHandler(async (event) => {
  const STEAM_KEY = process.env.STEAM_KEY || null;
  const STEAM_ID = getHeader(event, 'x-steamid');
  console.log('STEAM_ID GAMES: ', STEAM_ID);

  if (STEAM_KEY && STEAM_ID) {
    try {
      const URL = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_KEY}&steamid=${STEAM_ID}&include_appinfo=true&format=json`;
      const { response }: SteamOwnedGamesResponse = await $fetch(URL);
      console.log('🚀 FETCHING OWNED GAMES!');

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
    if (!STEAM_KEY) {
      console.error('❓ Missing API Key while getting player owned games');
    }
    if (!STEAM_ID) {
      console.error('❓ Missing Steam ID while getting player owned games');
    }
    return {
      ok: false,
      data: null,
      error: '❓ Missing API Key or Steam ID while getting player owned games'
    };
  }
});