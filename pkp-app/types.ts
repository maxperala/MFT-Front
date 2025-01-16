import { Feature, MultiPolygon } from "geojson";

export interface Coords {
  lat: number;
  lon: number;
  heading?: number | undefined;
}

export interface UserLocation {
  allowed: boolean;
  allowedLoading: boolean;
  focused: boolean;
  coords: Coords | null;
  zoom: number;
  mapLoading: boolean;
  packExists: boolean;
  showMap: boolean;
}

export interface User {
  id: string;
  username: string;
  lvl: Level;
  token: string;
  unlocked: string[];
  packs: string[];
  stamps?: Stamp[];
}

export interface Stamp {
  asset: string;
  description: string;
}

export interface Level {
  lvl: number;
  name_en: string;
  name_fi: string;
  limit: number;
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
  pack: string;
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

export interface Pack {
  id: string;
  name: string;
  name_fi: string;
  image_url: string;
  paid: boolean;
}

export interface PackState {
  packs: Pack[];
}

export interface PictureUrlState {
  url: string | null;
}

export interface PostCodeInfo {
  code: string;
  name: string;
  poly: Feature<MultiPolygon>;
}

export interface NavigationState {
  currentDistrict: PostCodeInfo | null;
}

export interface UnlockedResponse {
  discovered: string[];
  newLevel: Level;
}
