import { RootState } from "@/state/store";
import { View, StyleSheet, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Compass = () => {
  const heading = useSelector(
    (state: RootState) => state.location.coords?.heading
  );
  const animatedRotation = useSharedValue<number>(0);
  useEffect(() => {
    // We need to account for cases where the heading goes from for example 5 -> 355, to not make the compass backtrack but to cross zero.
    if (heading) {
      const current = animatedRotation.value;
      const target = Math.round(heading);

      if (current > target && current - target > 180) {
        animatedRotation.value = current - 360;
      } else if (current < target && target - current > 180) {
        animatedRotation.value = current + 360;
      }
      animatedRotation.value = withSpring(Math.round(target));
    }
  }, [heading]);

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
    opacity: 0.7,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
  },
  needle: {
    position: "absolute",
    width: 80,
    height: 80,
    opacity: 0.9,
  },
});

export default Compass;
