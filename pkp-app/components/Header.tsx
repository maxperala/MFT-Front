import { StyleSheet, View } from "react-native";
import { colors_new } from "@/colors";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();

  const navData = useSelector((state: RootState) => state.navigation);
  const aniLength = useSharedValue(0);
  // We need to update the data indirectly trough this useState, so that the text doesn't change before the animation is reset :)
  const [data, setData] = useState(navData);

  const aniStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scaleX: aniLength.value / 100 }],
      opacity: aniLength.value / 100,
    };
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
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.Text style={[style.text, aniStyle]}>
          {data.currentDistrict ? data.currentDistrict.name : t("unknown")}
        </Animated.Text>
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
    elevation: 8,

    backgroundColor: colors_new.red,
  },
  text: {
    fontSize: 26,
    color: colors_new.dirty_white,
    fontFamily: "Fair-Prosper",
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 3,
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 4,
    shadowOpacity: 0.5,
    textAlign: "center",
  },
});

export default Header;
