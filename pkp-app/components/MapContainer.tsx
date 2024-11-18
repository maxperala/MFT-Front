import { View, StyleSheet } from "react-native";
import MapViewer from "./MapViewer";

const MapContainer = () => {
  return (
    <View style={style.container}>
      <MapViewer />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapContainer;
