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

export interface SteamGameDetails {
  [key: string]: {
    success: boolean;
    data: {
      name: string;
      steam_appid: number;
      type: string;
      detailed_description: string;
      about_the_game: string;
      short_description: string;
      supported_languages: string;
      header_image: string;
      capsule_image: string;
      website: string;
      developers: string[];
      publishers: string[];
      platforms: {
        windows: boolean;
        mac: boolean;
        linux: boolean;
      };
      categories: {
        id: number;
        description: string;
      }[];
      genres: {
        id: number;
        description: string;
      }[];
      archievements: {
        total: number;
        highlighted: {
          name: string;
          path: string;
        };
      };
      release_date: {
        coming_soon: boolean;
        date: string;
      };
      background: string;
      background_raw: string;
    };
  };
}
export interface SteamGameProp {
  name: string;
  steam_appid: number;
  type: string;
  detailed_description: string;
  about_the_game: string;
  short_description: string;
  supported_languages: string;
  header_image: string;
  capsule_image: string;
  website: string;
  developers: string[];
  publishers: string[];
  platforms: {
    windows: boolean;
    mac: boolean;
    linux: boolean;
  };
  categories: {
    id: number;
    description: string;
  }[];
  genres: {
    id: number;
    description: string;
  }[];
  archievements: {
    total: number;
    highlighted: {
      name: string;
      path: string;
    };
  };
  release_date: {
    coming_soon: boolean;
    date: string;
  };
  background: string;
  background_raw: string;
};