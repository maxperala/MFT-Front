import { View, Text, StyleSheet } from "react-native";
import MapContainer from "@/components/MapContainer";
const mapScreen = () => {
  return (
    <View style={style.container}>
      <MapContainer />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default mapScreen;
