import MapLibreGL from "@maplibre/maplibre-react-native";
import { BOUNDS, MAPTILER_API_KEY } from "@/config";

// THIS IS NOT GOING TO BE USED FOR NOW. MAPLIBRE DOES NOT LIKE IT
export const downloadMap = async (): Promise<boolean> => {
  const progressListener = (region: any, status: any) => {
    console.log(status);
    if (status.percentage === 100) {
      console.log("finished downloading", region);
    }
  };
  const errorListener = (region: any, error: any) => {
    console.log(error);
  };
  try {
    console.log("trying");
    await MapLibreGL.offlineManager.createPack(
      {
        name: "pyynikki",
        styleURL: `https://api.maptiler.com/maps/a6fff3d6-a1f6-47a9-b3c1-b5bc485253e3/style.json?key=${MAPTILER_API_KEY}`,
        minZoom: 10,
        maxZoom: 20,
        bounds: BOUNDS,
      },
      progressListener,
      errorListener
    );
    return true;
  } catch (e) {
    throw new Error("Failed to load map, please restart");
  }
};

export const checkMapExists = async (): Promise<boolean> => {
  await MapLibreGL.offlineManager.deletePack("pyynikki");
  const packs = await MapLibreGL.offlineManager.getPacks();
  if (packs && packs.find((pack) => pack.name === "pyynikki")) {
    console.log("Map pack found");
    return true;
  }
  return false;
};
