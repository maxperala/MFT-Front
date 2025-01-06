import { View, StyleSheet } from "react-native";
import { useRef, useState } from "react";
import Marker from "./Marker";
import { BOUNDS } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import Mapbox from "@rnmapbox/maps";
import { useLocation } from "@/utils/hooks";
import { setMapHeading, setMapLoading } from "@/state/locationReducer";
import { Platform } from "react-native";
/**
 * There is an issue with the Mapbox library version 10.1.33 and ios 17.X currently.
 * The user location causes an error and weird behaviour. So we use expo-location for the actual location
 * functionality of the app trough useLocation custom hook. But we can still render the Mapbox.LocationPuck component, without errors
 * so we use that. Idk how it is working while UserLocation is not, but we use it like this for now.
 */

// These are public api keys, and can be exposed. They just provide access to the right style of map
import {
  MAPBOX_PUBLIC_KEY,
  MAPBOX_STYLE_URL,
  centerCoordinate,
} from "@/config";

import colors, { colors_new } from "@/colors";

Mapbox.setAccessToken(MAPBOX_PUBLIC_KEY);

const MapViewerMapbox = () => {
  const dispatch: AppDispatch = useDispatch();
  const mapRef = useRef<Mapbox.Camera>(null);
  // DON'T REMOVE THIS, IT WILL BREAK THE APP ON IOS!! ** The map needs to rerender after loading the first time for it to emit any data. So we force a rerender when the map itself states it's ready **
  const _ready = useSelector((state: RootState) => state.location.mapLoading);
  const cards = useSelector((state: RootState) => state.cardData.cards);
  const [zoomLevel, setZoomLevel] = useState(0);

  useLocation();
  const defaultSettings: Mapbox.CameraStop = {
    centerCoordinate: centerCoordinate,
    zoomLevel: 13,
  };

  const updateHeadingAndZoom = (e: Mapbox.MapState) => {
    setZoomLevel(e.properties.zoom);
    dispatch(setMapHeading(e.properties.heading));
  };

  const setMapReady = () => {
    mapRef.current?.setCamera(defaultSettings);
    dispatch(setMapLoading(false));
  };

  return (
    <View style={styles.container}>
      <Mapbox.MapView
        style={styles.map}
        styleURL={MAPBOX_STYLE_URL}
        compassEnabled={false}
        // Compass won't disable on iOS, so I hid it
        compassPosition={{ top: -50, left: -50 }}
        scaleBarEnabled={false}
        // The first one works on ios but not android. Thus the second one lol
        onDidFinishLoadingMap={Platform.OS === "ios" ? setMapReady : () => null}
        onDidFinishLoadingStyle={
          Platform.OS === "android" ? setMapReady : () => null
        }
        onCameraChanged={updateHeadingAndZoom}
      >
        <Mapbox.Camera
          maxBounds={{ ne: BOUNDS[0], sw: BOUNDS[1] }}
          ref={mapRef}
          defaultSettings={defaultSettings}
        />

        <Mapbox.LocationPuck
          pulsing={{ isEnabled: true, color: colors_new.dark_red }}
          
        />

        {zoomLevel > 14 && cards
          ? cards.map((card) => {
              return (
                <Mapbox.MarkerView
                  coordinate={[card.location.lon, card.location.lat]}
                  key={card.id}
                  allowOverlap={true}
                  allowOverlapWithPuck={true}
                >
                  <Marker card={card} />
                </Mapbox.MarkerView>
              );
            })
          : null}

      </Mapbox.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    backgroundColor: "black",
    alignContent: "stretch",
  },
  tileContainer: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default MapViewerMapbox;
