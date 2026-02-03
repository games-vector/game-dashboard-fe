export interface Game {
  gameCode: string;
  gameName: string;
  displayName: string;
  platform: string;
  gameType: string;
  isActive: boolean;
  description: string | null;
  thumbnail: string | null;
  demoGif: string | null;
  images: string[];
  rtp: number | null;
  betConfig: {
    minBetAmount: string;
    maxBetAmount: string;
    currency: string;
  };
  frontendHost: string | null;
}

export interface DashboardGamesResponse {
  userId: string;
  agentId: string;
  cert: string;
  games: Game[];
}

export interface LoginAndLaunchGamePayload {
  cert: string;
  agentId: string;
  userId: string;
  platform: string;
  gameType: string;
  gameCode: string;
}

export interface LoginAndLaunchGameResponse {
  status: string;
  url?: string;
  extension: any[];
  desc?: string;
  gameCode?: string;
  operatorId?: string;
  token?: string;
}
