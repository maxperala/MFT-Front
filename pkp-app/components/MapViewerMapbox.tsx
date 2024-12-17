import { View, StyleSheet } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Postcard } from "@/types";
import Marker from "./Marker";
import { BOUNDS } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import colors from "@/colors";
import Mapbox, { UserTrackingMode } from "@rnmapbox/maps";
import {
  setFocusedOnUser,
  setUserLocation,
  setMapHeading,
  setMapLoading,
} from "@/state/locationReducer";
import { Location } from "@rnmapbox/maps";

// These are public api keys, and can be exposed. They just provide access to the right style of map
import {
  MAPBOX_PUBLIC_KEY,
  MAPBOX_STYLE_URL,
  centerCoordinate,
} from "@/config";
import { discoverCards } from "@/state/userReducer";

Mapbox.setAccessToken(MAPBOX_PUBLIC_KEY);

const MapViewerMapbox = () => {
  const dispatch: AppDispatch = useDispatch();
  const mapRef = useRef<Mapbox.Camera>(null);
  const ready = useSelector((state: RootState) => state.location.mapLoading);
  const focused = useSelector((store: RootState) => store.location.focused);
  const cards = useSelector((state: RootState) => state.cardData.cards);
  const [zoomLevel, setZoomLevel] = useState(0);
  const defaultSettings: Mapbox.CameraStop = {
    centerCoordinate: centerCoordinate,
    zoomLevel: 10,
  };

  const updateLocation = (loc: Location) => {
    dispatch(setUserLocation(loc));
    dispatch(discoverCards());
  };

  const setFocused = () => {
    dispatch(setFocusedOnUser(true));
  };

  const updateHeadingAndZoom = (e: Mapbox.MapState) => {
    setZoomLevel(e.properties.zoom);
    dispatch(setMapHeading(e.properties.heading));
  };

  const setMapReady = () => {
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
        onDidFinishLoadingMap={setMapReady}
        onCameraChanged={updateHeadingAndZoom}
      >
        <Mapbox.Camera
          followUserLocation={focused}
          followUserMode={UserTrackingMode.Follow}
          maxBounds={{ ne: BOUNDS[0], sw: BOUNDS[1] }}
          zoomLevel={10}
          ref={mapRef}
          centerCoordinate={centerCoordinate}
        />
        <Mapbox.UserLocation onUpdate={updateLocation}>
          <Mapbox.LocationPuck
            pulsing={{ isEnabled: true, color: colors.light_warm_red }}
          />
        </Mapbox.UserLocation>

        {zoomLevel > 14 && cards
          ? cards.map((card) => {
              return (
                <Mapbox.MarkerView
                  coordinate={[card.location.lon, card.location.lat]}
                  key={card.id}
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
