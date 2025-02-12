/**
 * Stamp Card Component
 *
 * A container component that displays a stamp collection grid within a styled
 * frame with background effects.
 *
 * Features:
 * - Styled frame background
 * - Integrated stamp grid display
 * - Custom opacity and shadow effects
 * - Responsive aspect ratio
 * - Subtle rotation transform
 * - Flexible container layout
 *
 * @component
 */
import { colors } from "@/colors";
import { View, StyleSheet, Image } from "react-native";
import StampGrid from "./StampGrid";

const StampCard = () => {
  return (
    <View style={style.container}>
      <View style={style.imageContainer}>
        <Image
          source={require("@/assets/images/stamp-frame.png")}
          style={style.image}
        />
        <StampGrid />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: "center",
    padding: 2,
  },
  image: {
    flex: 1,
    objectFit: "contain",
    width: "100%",
    height: "100%",
    opacity: 0.7,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.light_grey,
    opacity: 0.8,
    borderRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.5,
    transform: [
      {
        rotate: "-1deg",
      },
    ],
  },
});

export default StampCard;
