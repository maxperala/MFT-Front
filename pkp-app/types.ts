export interface Coords {
  lat: number;
  lon: number;
  heading: number | undefined;
}

export interface UserLocation {
  allowed: boolean;
  focused: boolean;
  coords: Coords | null;
  zoom: number;
}

export interface User {
  id: string;
  username: string;
  lvl: string;
  token: string;
}

export interface NewUser {
  username: string;
  secret_code: string;
}

export interface AccountState {
  user: User | null;
}

export interface ErrorResponseData {
  error: string[];
}

export type LoginResponse = User | ErrorResponseData;
