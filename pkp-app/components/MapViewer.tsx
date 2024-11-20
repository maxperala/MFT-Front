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
import { setUserLocation } from "@/state/locationReducer";
// This api key is safe to expose for testing purposes. Production
const mapStyleUrl = `https://api.maptiler.com/maps/a6fff3d6-a1f6-47a9-b3c1-b5bc485253e3/style.json?key=${MAPTILER_API_KEY}`;

const MapViewer = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useSelector((store: RootState) => store.location);
  const updateLocation = (loc: Location) => {
    dispatch(setUserLocation(loc));
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} styleJSON={mapStyleUrl} compassEnabled={true}>
        <Camera
          followUserLocation={location.focused}
          followUserMode={UserTrackingMode.FollowWithCourse}
          followZoomLevel={15}
        />
        <UserLocation renderMode="normal" onUpdate={updateLocation} />
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
