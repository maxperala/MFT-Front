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
  mapLoading: boolean;
}

export interface User {
  id: string;
  username: string;
  lvl: string;
  token: string;
  unlocked: string[];
}

export interface NewUser {
  username: string;
  secret_code: string;
}

export interface AccountState {
  user: User | null;
  loading: boolean;
}

export interface ErrorResponseData {
  error: string[];
}

export interface Postcard {
  location: {
    lat: number;
    lon: number;
  };
  title_fi: string;
  title_en: string;
  description_fi: string;
  description_en: string;
  source: string;
  degree: number;
  year: string;
  photographer: string;
  url: string;
  id: string;
}

export interface PostcardsState {
  cards: Postcard[] | null;
  active: Postcard | null;
}

export interface LoadingStatus {
  mapLoading: boolean;
  loginLoading: boolean;
}

export type LoginResponse = User | ErrorResponseData;

export type ToastType = "discover" | "notification" | null;

export interface ToastState {
  type: ToastType;
  message: string | null;
  active: boolean;
}
