export interface UserLocation extends Location {
  allowed: boolean;
  focused: boolean;
}

export interface Location {
  lat: number;
  lon: number;
}
