import { colors_new } from "@/colors";
import { Stamp } from "@/types";
import { View, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import ModalStampImage from "./ModalStampImageAndDescription";
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { setVisibility } from "@/state/stampsReducer";
import StampModalCloseButton from "./StampModalCloseButton";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const StampModal = ({ stamp }: { stamp: Stamp }) => {
  const animation = useRef<LottieView>(null);
  const dispatch: AppDispatch = useDispatch();
  const viewed = useSelector((state: RootState) => state.stamps.viewedStamps);
  console.log("VIEWED", viewed);
  const halfwayTriggered = useRef(false);
  const [layoutReady, setLayoutReady] = useState(false);
  const isNew = useMemo(() => {
    return !viewed.includes(stamp.id);
  }, [viewed, stamp]);
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
        {isNew ? <Text style={style.heading}>STAMP UNLOCKED</Text> : null}
        <ModalStampImage stamp={stamp} />
        <LottieView
          ref={animation}
          style={style.animation}
          source={require("@/assets/animations/stamping.json")}
          onAnimationFinish={onHalfway}
          onLayout={() => setLayoutReady(true)}
          loop={false}
        />
        <StampModalCloseButton id={stamp.id} />
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
  heading: {
    fontSize: 18,
    fontFamily: "SpecialElite-Regular",
    color: colors_new.black,
    position: "absolute",
    top: "5%",
  },
});

export default StampModal;
