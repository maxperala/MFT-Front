import { RootState } from "@/state/store";
import { Stamp } from "@/types";
import { Image, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const ModalStampImageAndDescription = ({ stamp }: { stamp: Stamp }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const visible = useSelector(
    (state: RootState) => state.stamps.activeStampVisible
  );
  const textVisibility = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      textVisibility.value = withTiming(1, {
        duration: 10000,
        easing: Easing.out(Easing.exp),
      });
    }
  }, [visible]);

  const aniStyle = useAnimatedStyle(() => {
    return {
      opacity: textVisibility.value,
    };
  });

  return (
    <View style={style.container}>
      <Image
        source={{ uri: stamp.asset }}
        style={{
          width: "40%",
          height: "40%",
          objectFit: "contain",
          opacity: visible ? 1 : 0,
        }}
      />
      <Animated.Text style={[style.text, aniStyle]}>
        {lang === "fi" ? stamp.description_fi : stamp.description_en}
      </Animated.Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    gap: "7%",
  },
  text: {
    fontSize: 20,
    fontFamily: "MarckScript-Regular",
    textAlign: "center",
  },
});

export default ModalStampImageAndDescription;
