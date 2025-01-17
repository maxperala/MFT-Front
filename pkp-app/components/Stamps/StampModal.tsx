import { colors_new } from "@/colors";
import { Stamp } from "@/types";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useEffect, useRef, useState } from "react";
import ModalStampImage from "./ModalStampImageAndDescription";
import { AppDispatch } from "@/state/store";
import { useDispatch } from "react-redux";
import { setVisibility } from "@/state/stampsReducer";
import StampModalCloseButton from "./StampModalCloseButton";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const StampModal = ({ stamp }: { stamp: Stamp }) => {
  const animation = useRef<LottieView>(null);
  const dispatch: AppDispatch = useDispatch();
  const halfwayTriggered = useRef(false);
  const [layoutReady, setLayoutReady] = useState(false);
  useEffect(() => {
    console.log(layoutReady);
    if (animation.current && layoutReady) {
      animation.current.play(0, 15);
    }
  }, [layoutReady]);

  const onHalfway = () => {
    if (halfwayTriggered.current) {
      animation.current?.pause();
      return;
    }
    halfwayTriggered.current = true;
    dispatch(setVisibility(true));
    setTimeout(() => {
      animation.current?.play(15);
    }, 500);
  };

  return (
    <Animated.View
      style={style.container}
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(500)}
    >
      <View style={style.innerContainer}>
        <ModalStampImage stamp={stamp} />
        <LottieView
          ref={animation}
          style={style.animation}
          source={require("@/assets/animations/stamping.json")}
          onAnimationFinish={onHalfway}
          onLayout={() => setLayoutReady(true)}
          loop={false}
        />
        <StampModalCloseButton />
      </View>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    pointerEvents: "auto",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  innerContainer: {
    width: "85%",
    height: "45%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors_new.beige,
    borderWidth: 1,
    borderRadius: 6,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 5,
    shadowOpacity: 0.6,
    elevation: 8,
  },
  animation: {
    width: "127%",
    height: "127%",
    position: "absolute",
  },
});

export default StampModal;
