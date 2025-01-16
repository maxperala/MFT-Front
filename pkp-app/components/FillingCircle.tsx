import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import { colors_new } from "@/colors";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedProps,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
// The circle fills according to the users progress on the current level
const FillingCircle = ({
  percentage,
  lvl,
}: {
  percentage: number;
  lvl: number;
}) => {
  const wh = 40;
  const cxcy = wh / 2;
  const strokeWidth = 2;
  const radius = 13;
  const circumference = 2 * Math.PI * radius;

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const animatedStrokeOffset = useSharedValue(
    circumference - (circumference * percentage) / 100
  );
  useEffect(() => {
    animatedStrokeOffset.value = withSpring(
      circumference - (circumference * percentage) / 100,
      { duration: 500 }
    );
  }, [percentage]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: animatedStrokeOffset.value,
  }));
  return (
    <View style={style.container}>
      <Svg width={wh} height={wh}>
        <Defs>
          <LinearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor={colors_new.gold} />
            <Stop offset="100%" stopColor={colors_new.red} />
          </LinearGradient>
        </Defs>

        <AnimatedCircle
          cx={cxcy}
          cy={cxcy}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
        />
      </Svg>
      <Text style={style.text}>{lvl}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Fair-Prosper",
    color: colors_new.dirty_white,
    fontSize: 18,
    position: "absolute",
    lineHeight: 40,
    paddingTop: 4,
  },
});

export default FillingCircle;
