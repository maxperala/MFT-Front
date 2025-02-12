/**
 * Empty Stamp Component
 *
 * A placeholder component that displays a circular stamp outline image
 * in a centered container.
 *
 * Features:
 * - Centered container layout
 * - Circular stamp outline image
 * - Responsive image sizing
 * - Consistent object fitting
 *
 * @component
 */
import { Image, View, StyleSheet } from "react-native";

const EmptyStamp = () => {
  return (
    <View style={style.container}>
      <Image
        source={require("@/assets/images/stamp_images/circle.png")}
        style={style.image}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
});

export default EmptyStamp;
