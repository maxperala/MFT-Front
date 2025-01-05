import postal_data from "@/assets/mapping/postal_data.json";
import { PostCodeInfo } from "./types";
import wellknown from "wellknown";
import { multiPolygon } from "@turf/helpers";

export const POST_CODE_DATA: PostCodeInfo[] = postal_data.codes
  .map((info) => {
    const p = wellknown.parse(info.poly);
    if (p?.type === "MultiPolygon") {
      return { ...info, poly: multiPolygon(p.coordinates) };
    }
    return { ...info, poly: null };
  })
  .filter((p) => p.poly != null);

// Safe to expose for testing.
export const MAPTILER_API_KEY = "h6APfvFtOjPAHL29TYsK";
export const MAPBOX_PUBLIC_KEY =
  "pk.eyJ1IjoibWF4cGVyYWxhIiwiYSI6ImNtNHBzNWh2MzBuZGsya3MzZGRjNHJnZWIifQ.AfbjHIYVmWRjayhMqyS_0A";
// Machine ip server is running on... when testing on mobile can't use localhost... works on emulator
export const BACKEND_URL = "https://pkp-backend.fly.dev/api";
export const MAPBOX_STYLE_URL =
  "mapbox://styles/maxperala/cm4ptcmi2008q01r3hltl9i8u";
export const CDN_URL = "https://pkp-backend.fly.dev/";

// These are the bounds for the mappack and the mapview. Point is to force the user to use locally available tiles to limit the api requests. UPDATE: local not possible :(
// Pretty good box. When zoomed fully out it's about the centrum of Tampere.
export const BOUNDS: [GeoJSON.Position, GeoJSON.Position] = [
  [24.246317, 61.78],
  [23.311911, 61.25],
];

export const centerCoordinate = [23.73252, 61.49613];

export const DISCOVER_RANGE = 80;
