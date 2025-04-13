import { getCookie, getHeader } from 'h3';
import type { SteamSummaryResponse } from '@/interfaces/steam';

export default defineEventHandler(async (event) => {
  const STEAM_KEY = process.env.STEAM_KEY || null;
  const STEAM_ID = getHeader(event, 'x-steamid');
  console.log('STEAM_ID SUMMARY: ', STEAM_ID);

  if (STEAM_KEY && STEAM_ID) {
    try {
      const URL = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_KEY}&steamids=${STEAM_ID}`;
      const { response }: SteamSummaryResponse = await $fetch(URL);
      console.log('🚀 FETCHING PLAYER SUMMARY!');

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
      console.error('❓ Missing API Key while getting player summary');
    }
    if (!STEAM_ID) {
      console.error('❓ Missing Steam ID while getting player summary');
    }
    return {
      ok: false,
      data: null,
      error: '❓ Missing API Key or Steam ID while getting player summary'
    };
  }
});