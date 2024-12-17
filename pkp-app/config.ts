// Safe to expose for testing.
export const MAPTILER_API_KEY = "h6APfvFtOjPAHL29TYsK";
export const MAPBOX_PUBLIC_KEY =
  "pk.eyJ1IjoibWF4cGVyYWxhIiwiYSI6ImNtNHBzNWh2MzBuZGsya3MzZGRjNHJnZWIifQ.AfbjHIYVmWRjayhMqyS_0A";
// Machine ip server is running on... when testing on mobile can't use localhost... works on emulator
export const BACKEND_URL = "http://192.168.1.112:3001/api";
export const MAPBOX_STYLE_URL =
  "mapbox://styles/maxperala/cm4ptcmi2008q01r3hltl9i8u";
export const CDN_URL = "http://192.168.1.112:8000";

// These are the bounds for the mappack and the mapview. Point is to force the user to use locally available tiles to limit the api requests. UPDATE: local not possible :(
export const BOUNDS: [GeoJSON.Position, GeoJSON.Position] = [
  [24.246317, 61.75], // Extended northward
  [23.311911, 61.333], // Extended southward
];

export const centerCoordinate = [23.73252, 61.49613];
