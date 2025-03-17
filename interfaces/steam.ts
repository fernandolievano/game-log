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
export interface SteamSummaryResponse {
  response: {
    players: SteamPlayer[];
  };
}