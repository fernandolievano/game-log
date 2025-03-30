export interface SteamPlayer {
  steamid: string;
  avatar: string;
  avatarfull: string;
  avatarhash: string;
  avatarmedium: string;
  communityvisibilitystate: number;
  personaname: string;
  personastate: number;
  profilestate: number;
  profileurl: string;
}
export interface SteamGame {
  appid: number;
  name: string;
  img_icon_url: string;
  playtime_forever: number;
  rtime_last_played: number;
}
export interface SteamSummaryResponse {
  response: {
    players: SteamPlayer[];
  };
}
export interface SteamOwnedGamesResponse {
  response: {
    game_count: number;
    games: any[];
  };
}