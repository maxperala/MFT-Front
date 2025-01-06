import { StyleSheet } from "react-native";
import { colors_new } from "@/colors";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect, useState } from "react";
import { Text, View } from "tamagui";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  const AnimatedText = Animated.createAnimatedComponent(Text);
  const navData = useSelector((state: RootState) => state.navigation);
  const aniLength = useSharedValue(0);
  // We need to update the data indirectly trough this useState, so that the text doesn't change before the animation is reset :)
  const [data, setData] = useState(navData);

  const aniStyle = useAnimatedStyle(() => {
    return { width: `${aniLength.value}%`, opacity: aniLength.value / 100 };
  });

  useEffect(() => {
    aniLength.value = 0;
    setData(navData);
    aniLength.value = withTiming(100, {
      duration: 1300,
      easing: Easing.out(Easing.quad),
      reduceMotion: ReduceMotion.System,
    });
  }, [navData]);

  return (
    <View style={style.container}>
      <View justifyContent="center" alignItems="center">
        <AnimatedText style={[style.text, aniStyle]}>
          {data.currentDistrict
            ? data.currentDistrict.name
            : t("unknown")}
        </AnimatedText>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.3,
    zIndex: 10,
    elevation: 8,

    backgroundColor: colors_new.red,
  },
  text: {
    fontSize: 26,
    color: colors_new.dirty_white,
    fontFamily: "Fair-Prosper",
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 4,
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 4,
    shadowOpacity: 0.5,
  },
});

export default Header;
