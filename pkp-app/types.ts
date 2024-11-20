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
