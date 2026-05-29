export interface Survey {
  id?: string;
  userId: string;
  userEmail: string;

  alias: string;
  ageRange: string;
  role: string;
  favoriteGame: string;
  platform: string;
  genre: string;
  comment: string;

  latitude: number;
  longitude: number;
  timestamp: number;
  campusLocation: string;

  photoUrl: string;
  gameInfo?: GameInfo;
}

export interface GameInfo {
  id: number;
  name: string;
  backgroundImage: string;
  genres: string;
  platforms: string;
  rating: number;
  description: string;
  metacritic?: number;
}