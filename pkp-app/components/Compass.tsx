import { RootState } from "@/state/store";
import { View, StyleSheet, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import { useEffect } from "react";
// The compass has a problem, when we cross heading 360 and back to 0, it backtracks instead of going forward. But since it looks cool I will ingore for now
const Compass = () => {
  const location = useSelector((state: RootState) => state.location);
  const animatedRotation = useSharedValue<number>(0);
  useEffect(() => {
    if (location.coords?.heading)
      animatedRotation.value = withSpring(Math.round(location.coords?.heading));
  }, [location]);

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${animatedRotation.value}deg` }],
    };
  });

  return (
    <View style={style.container}>
      <Animated.Image
        source={require("@/assets/images/compass-bg.png")}
        style={[style.background, animationStyle]}
      />
      <Image
        source={require("@/assets/images/compass-needle.png")}
        style={style.needle}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    width: 80,
    height: 80,
    opacity: 0.8,
  },
  needle: {
    position: "absolute",
    width: 80,
    height: 80,
    opacity: 0.8,
  },
});

export default Compass;
