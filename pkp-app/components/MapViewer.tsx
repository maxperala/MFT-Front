import { View, StyleSheet } from "react-native";
import {
  MapView,
  Camera,
  UserTrackingModes,
  UserLocation,
  UserTrackingMode,
} from "@maplibre/maplibre-react-native";
import { MAPTILER_API_KEY } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { Location } from "@maplibre/maplibre-react-native";
import {
  setFocusedOnUser,
  setUserLocation,
  setMapHeading,
} from "@/state/locationReducer";
import { RegionPayload } from "@maplibre/maplibre-react-native/javascript/components/MapView";
// This api key is safe to expose for testing purposes. Production
const mapStyleUrl = `https://api.maptiler.com/maps/a6fff3d6-a1f6-47a9-b3c1-b5bc485253e3/style.json?key=${MAPTILER_API_KEY}`;

const MapViewer = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useSelector((store: RootState) => store.location);
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

  const updateHeading = (e: GeoJSON.Feature<GeoJSON.Point, RegionPayload>) => {
    console.log(e);
    dispatch(setMapHeading(e.properties.heading));
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        styleJSON={mapStyleUrl}
        compassEnabled={true}
        onRegionIsChanging={updateHeading}
      >
        <Camera
          followUserLocation={location.focused}
          followUserMode={UserTrackingMode.FollowWithHeading}
          followZoomLevel={location.zoom}
          onUserTrackingModeChange={updateFollow}
        />
        <UserLocation
          renderMode="normal"
          onUpdate={updateLocation}
          onPress={setFocused}
        />
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
