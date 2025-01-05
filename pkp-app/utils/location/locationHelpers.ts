import haversine from "haversine-distance";
import { Coords, PostCodeInfo } from "@/types";
import { isPointInPolygon } from "geolib";
import { BOUNDS, POST_CODE_DATA } from "@/config";
import { GeolibInputCoordinates } from "geolib/es/types";
import { booleanPointInPolygon } from "@turf/boolean-point-in-polygon";
import { point } from "@turf/turf";

/* These functions are not in locationUtils since they don't rely on Redux.
So they are here to avoid dependency loops basically.
*/

export const calculateDistance = (a: Coords, b: Coords): number => {
  return haversine([a.lat, a.lon], [b.lat, b.lon]);
};

export const isUserInArea = (c: Coords): boolean => {
  const is = isPointInPolygon(c, boundingBoxToPolygon(BOUNDS));

  return is;
};

const boundingBoxToPolygon = (
  bounds: [GeoJSON.Position, GeoJSON.Position]
): GeolibInputCoordinates[] => {
  const [topRight, bottomLeft] = bounds;
  const [maxLng, maxLat] = topRight;
  const [minLng, minLat] = bottomLeft;

  return [
    [maxLng, maxLat],
    [minLng, maxLat],
    [minLng, minLat],
    [maxLng, minLat],
    [maxLng, maxLat],
  ];
};

export const locToArea = (loc: Coords): PostCodeInfo | null => {
  const p = point([loc.lon, loc.lat]);
  for (const info of POST_CODE_DATA) {
    if (booleanPointInPolygon(p, info.poly)) {
      return info;
    }
  }

  return null;
};
