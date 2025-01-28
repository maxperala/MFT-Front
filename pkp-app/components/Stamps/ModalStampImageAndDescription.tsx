import { RootState } from "@/state/store";
import { Stamp } from "@/types";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "tamagui";
import { useSelector } from "react-redux";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedText = Animated.createAnimatedComponent(Text);

const ModalStampImageAndDescription = ({ stamp }: { stamp: Stamp }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const visible = useSelector(
    (state: RootState) => state.stamps.activeStampVisible
  );
  const textVisibility = useSharedValue(0);
  const imageOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      textVisibility.value = withTiming(1, {
        duration: 10000,
        easing: Easing.out(Easing.exp),
      });
      imageOpacity.value = withTiming(1, { duration: 800 });
    } else {
      imageOpacity.value = 0;
      textVisibility.value = 0;
    }
  }, [visible]);

  const aniStyleText = useAnimatedStyle(() => {
    return {
      opacity: textVisibility.value,
    };
  });
  const aniStyleImage = useAnimatedStyle(() => {
    return {
      opacity: imageOpacity.value,
    };
  });

  return (
    <View style={style.container}>
      <AnimatedImage
        style={[style.image, aniStyleImage]}
        source={{ uri: stamp.asset }}
      />
      <AnimatedText
        style={[style.text, aniStyleText]}
        fontSize="$6"
        paddingLeft="4%"
        paddingRight="4%"
      >
        {lang === "fi" ? stamp.description_fi : stamp.description_en}
      </AnimatedText>
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
    fontFamily: "MarckScript-Regular",
    textAlign: "center",
  },
  image: {
    width: "40%",
    height: "40%",
    objectFit: "contain",
  },
});

export default ModalStampImageAndDescription;
