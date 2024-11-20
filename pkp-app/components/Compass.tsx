import { RootState } from "@/state/store";
import { View, StyleSheet, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Compass = () => {
  const location = useSelector((state: RootState) => state.location);
  const animatedRotation = useSharedValue(0);
  useEffect(() => {
    if (location.coords?.heading)
      animatedRotation.value = Math.round(location.coords?.heading);
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
        style={[style.needle, animationStyle]}
      />
      <Image
        source={require("@/assets/images/compass-needle.png")}
        style={style.background}
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
  },
  needle: {
    position: "absolute",
    width: 80,
    height: 80,
  },
});

export default Compass;
