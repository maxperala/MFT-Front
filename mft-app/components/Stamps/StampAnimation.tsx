import { StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useEffect, useRef, useState } from "react";
import { AppDispatch } from "@/state/store";
import { useDispatch } from "react-redux";
import { setVisibility } from "@/state/stampsReducer";

const stampingAnimation = require("@/assets/animations/stamping.json");

const StampAnimation = () => {
  const stage = useRef(1);
  const [ready, setReady] = useState(false);
  const animation = useRef<LottieView>(null);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (ready && animation.current) {
      animation.current.play(0, 15);
    }
  }, [ready]);

  const onFinnishAnimation = (cancelled: boolean) => {
    if (cancelled) {
      return;
    }
    if (stage.current === 1) {
      setTimeout(() => {
        dispatch(setVisibility(true));
        stage.current = 2;
        animation.current?.play(15);
      }, 500);
    } else {
      animation.current?.reset();
    }
  };
  return (
    <LottieView
      ref={animation}
      loop={false}
      onLayout={() => setReady(true)}
      onAnimationFinish={onFinnishAnimation}
      style={style.animation}
      source={stampingAnimation}
    />
  );
};

const style = StyleSheet.create({
  animation: {
    width: "130%",
    height: "130%",
    paddingBottom: "10%",
    position: "absolute",
  },
});

export default StampAnimation;
