import { View, StyleSheet } from "react-native";
import MapViewerMapbox from "./MapViewerMapbox";
import Compass from "./Compass";
import MapOverlay from "./MapOverlay";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import StampModal from "./Stamps/StampModal";

const MapContainer = () => {
  const showMap = useSelector((state: RootState) => state.location.showMap);
  const activeStamp = useSelector(
    (state: RootState) => state.stamps.activeStamp
  );
  return (
    <View style={style.container}>
      <MapViewerMapbox />
      <View style={style.compassContainer}>
        <Compass />
      </View>

      {!showMap ? <MapOverlay /> : null}
      {activeStamp ? <StampModal stamp={activeStamp} /> : null}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  compassContainer: {
    position: "absolute",
    top: 40,
    left: 280,
    zIndex: 1,
  },
});

export default MapContainer;
