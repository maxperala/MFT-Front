import { View, StyleSheet } from "react-native";
import MapViewer from "./MapViewer";
import Compass from "./Compass";
import { useDiscover } from "@/utils/hooks";

const MapContainer = () => {
  useDiscover();
  return (
    <View style={style.container}>
      <View style={style.compassContainer}>
        <Compass />
      </View>
      <MapViewer />
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
