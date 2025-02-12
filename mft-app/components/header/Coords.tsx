/**
 * Coordinates Display Component
 *
 * Displays the user's current latitude and longitude coordinates in a
 * styled format with custom typography and shadow effects.
 *
 * Features:
 * - Redux integration for location state
 * - Formatted coordinate display
 * - Custom font styling
 * - Shadow effects for visibility
 * - Conditional rendering based on coordinate availability
 *
 * @component
 */
import { colors } from "@/colors";
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
    color: colors.dirty_white,
    fontSize: 18,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 2,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
});
