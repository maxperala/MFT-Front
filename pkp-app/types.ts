export interface Coords {
  lat: number;
  lon: number;
}

export interface UserLocation {
  allowed: boolean;
  focused: boolean;
  coords: Coords | null;
}
