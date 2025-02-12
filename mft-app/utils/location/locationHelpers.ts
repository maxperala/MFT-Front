/**
 * Location utility functions for distance calculations and area checks
 *
 * These functions are kept separate from locationUtils to avoid Redux dependencies
 * and prevent circular dependencies.
 */
import haversine from "haversine-distance";
import { Coords, PostCodeInfo } from "@/types";
import { isPointInPolygon } from "geolib";
import { BOUNDS, POST_CODE_DATA } from "@/config";
import { GeolibInputCoordinates } from "geolib/es/types";
import { booleanPointInPolygon } from "@turf/boolean-point-in-polygon";
import { point } from "@turf/turf";

/**
 * Calculates distance between two coordinate points
 * @param a - First coordinate point
 * @param b - Second coordinate point
 * @returns Distance between points in meters
 */
export const calculateDistance = (a: Coords, b: Coords): number => {
  return haversine([a.lat, a.lon], [b.lat, b.lon]);
};

/**
 * Checks if coordinates are within defined area bounds
 * @param c - Coordinate point to check
 * @returns Boolean indicating if point is within bounds
 */
export const isUserInArea = (c: Coords): boolean => {
  const is = isPointInPolygon(c, boundingBoxToPolygon(BOUNDS));

  return is;
};

/**
 * Converts bounding box coordinates to polygon format
 * @param bounds - Array of two positions defining the bounding box
 * @returns Array of coordinates forming a polygon
 */
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

/**
 * Determines which postal code area coordinates fall within
 * @param loc - Coordinate point to check
 * @returns PostCodeInfo object if found, null if not in any area
 */
export const locToArea = (loc: Coords): PostCodeInfo | null => {
  const p = point([loc.lon, loc.lat]);
  for (const info of POST_CODE_DATA) {
    if (booleanPointInPolygon(p, info.poly)) {
      return info;
    }
  }

  return null;
};
