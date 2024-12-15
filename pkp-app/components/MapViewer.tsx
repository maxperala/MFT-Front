import { View, StyleSheet, Text } from "react-native";
import { useRef, useState } from "react";
import { Postcard } from "@/types";
import Marker from "./Marker";
import {
  MapView,
  Camera,
  UserLocation,
  UserTrackingMode,
  MarkerView,
} from "@maplibre/maplibre-react-native";
import { CameraRef } from "@maplibre/maplibre-react-native/javascript/components/Camera";
import { BOUNDS, MAPTILER_API_KEY } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { Location } from "@maplibre/maplibre-react-native";
import {
  setFocusedOnUser,
  setUserLocation,
  setMapHeading,
  setMapLoading,
} from "@/state/locationReducer";
import {
  MapViewRef,
  RegionPayload,
} from "@maplibre/maplibre-react-native/javascript/components/MapView";
// This api key is safe to expose for testing purposes. Production
const mapStyleUrl = `https://api.maptiler.com/maps/a6fff3d6-a1f6-47a9-b3c1-b5bc485253e3/style.json?key=${MAPTILER_API_KEY}`;

const MapViewer = () => {
  const dispatch: AppDispatch = useDispatch();
  const focused = useSelector((store: RootState) => store.location.focused);
  const cardData = useSelector((state: RootState) => state.cardData);
  const cameraRef = useRef<CameraRef>(null);
  const [zoomLevel, setZoomLevel] = useState(0);
  const centerCoordinate = [61.49582, 23.727992];
  const defaultSettings = {
    centerCoordinate,
    zoomLevel: 16,
    animationDuration: 2000,
  };

  let cards: Postcard[] = [];
  if (cardData.cards) {
    cards = cardData.cards;
  }

  const setCameraToDefault = () => {
    cameraRef.current?.setCamera(defaultSettings);
  };

  const updateLocation = (loc: Location) => {
    dispatch(setUserLocation(loc));
  };
  // WHAT IS THE TYPE HERE, anyways it works like this for now.
  const updateFollow = (e: any) => {
    dispatch(
      setFocusedOnUser(e.nativeEvent.payload.followUserLocation as boolean)
    );
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
    //setCameraToDefault();
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        styleURL={mapStyleUrl}
        compassEnabled={false}
        onRegionIsChanging={updateHeadingAndZoom}
        onDidFinishRenderingMapFully={setMapReady}
      >
        <Camera
          followUserLocation={focused}
          followUserMode={UserTrackingMode.FollowWithHeading}
          followZoomLevel={12}
          onUserTrackingModeChange={updateFollow}
          ref={cameraRef}
          maxBounds={{ ne: BOUNDS[0], sw: BOUNDS[1] }}
          minZoomLevel={11}
          maxZoomLevel={20}
          defaultSettings={defaultSettings}
        />
        <UserLocation
          renderMode="normal"
          onUpdate={updateLocation}
          onPress={setFocused}
        />
        {zoomLevel > 13
          ? cards.map((card) => {
              return (
                <MarkerView
                  coordinate={[card.location.lon, card.location.lat]}
                  key={card.id}
                >
                  <Marker card={card} />
                </MarkerView>
              );
            })
          : null}
      </MapView>
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

export default MapViewer;
