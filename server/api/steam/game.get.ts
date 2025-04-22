import { SteamGameDetails } from '@/interfaces/steam';

export default defineEventHandler(async (event) => {
  const APP_ID = getQuery(event).appid as string;
  try {
    const response: SteamGameDetails = await $fetch(`https://store.steampowered.com/api/appdetails?appids=${APP_ID}`);
    return {
      message: 'game fetched successfully',
      game: response[APP_ID].data
    };
  } catch (error) {
    console.error('error while getting game data: ', error);
    return {
      message: 'some required data is missing',
      game: null
    };
  }

});