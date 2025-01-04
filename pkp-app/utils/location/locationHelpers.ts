import haversine from "haversine-distance";
import { Coords } from "@/types";
import { isPointInPolygon } from "geolib";
import { BOUNDS } from "@/config";
import { GeolibInputCoordinates } from "geolib/es/types";

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
