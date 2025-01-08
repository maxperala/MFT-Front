import { colors_new } from "@/colors";
import { RootState } from "@/state/store";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const Coords = () => {
  const coords = useSelector((state: RootState) => state.location.coords);

  if (!coords) return <View style={{ flex: 1 }} />;
  return (
    <View style={style.container}>
      <Text style={style.text}>
        {coords.lat.toFixed(4)}, {coords.lon.toFixed(4)}
      </Text>
    </View>
  );
};

export default Coords;

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "MarckScript-Regular",
    color: colors_new.dirty_white,
    fontSize: 18,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 2,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
});
