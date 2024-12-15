import { View, StyleSheet } from "react-native";
import { useRef, useState } from "react";
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

// This api key is safe to expose for testing purposes. Production
import { MAPBOX_PUBLIC_KEY, MAPTIER_STYLE_URL } from "@/config";
import { RegionPayload } from "@rnmapbox/maps/lib/typescript/src/components/MapView";

Mapbox.setAccessToken(MAPBOX_PUBLIC_KEY);

const MapViewerMapbox = () => {
  const dispatch: AppDispatch = useDispatch();
  const mapRef = useRef<Mapbox.Camera>(null);
  const focused = useSelector((store: RootState) => store.location.focused);
  const cardData = useSelector((state: RootState) => state.cardData);
  const [zoomLevel, setZoomLevel] = useState(0);
  const centerCoordinate = [61.49582, 23.727992];
  const defaultSettings: Mapbox.CameraStop = {
    centerCoordinate,
    zoomLevel: 10,
    animationDuration: 2000,
  };

  let cards: Postcard[] = [];
  if (cardData.cards) {
    cards = cardData.cards;
  }

  const updateLocation = (loc: Location) => {
    dispatch(setUserLocation(loc));
  };

  const setFocused = () => {
    dispatch(setFocusedOnUser(true));
  };

  const updateHeadingAndZoom = (
    e: GeoJSON.Feature<GeoJSON.Point, RegionPayload>
  ) => {
    setZoomLevel(e.properties.zoomLevel);
    dispatch(setMapHeading(e.properties.heading));
  };

  const setMapReady = () => {
    dispatch(setMapLoading(false));
  };

  return (
    <View style={styles.container}>
      <Mapbox.MapView
        style={styles.map}
        styleURL={MAPTIER_STYLE_URL}
        compassEnabled={false}
        // Compass won't disable on iOS, so I hid it
        compassPosition={{ top: -50, left: -50 }}
        scaleBarEnabled={false}
        onRegionIsChanging={updateHeadingAndZoom}
        onDidFinishLoadingStyle={setMapReady}
      >
        <Mapbox.Camera
          followUserLocation={focused}
          followUserMode={UserTrackingMode.Follow}
          maxBounds={{ ne: BOUNDS[0], sw: BOUNDS[1] }}
          zoomLevel={10}
          ref={mapRef}
        />
        <Mapbox.UserLocation onUpdate={updateLocation} onPress={setFocused}>
          <Mapbox.LocationPuck
            scale={1}
            pulsing={{ isEnabled: true, color: colors.warm_red }}
          />
        </Mapbox.UserLocation>

        {zoomLevel > 14
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
