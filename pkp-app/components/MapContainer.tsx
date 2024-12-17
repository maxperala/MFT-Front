import { View, StyleSheet } from "react-native";
import MapViewerMapbox from "./MapViewerMapbox";
import Compass from "./Compass";

const MapContainer = () => {
  console.log("rendered");
  return (
    <View style={style.container}>
      <View style={style.compassContainer}>
        <Compass />
      </View>
      <MapViewerMapbox />
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
