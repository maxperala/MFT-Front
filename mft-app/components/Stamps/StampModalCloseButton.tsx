import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors_new } from "@/colors";
import { clearActiveStamp } from "@/state/stampsReducer";
import { AppDispatch, RootState } from "@/state/store";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect, useState } from "react";
import { StampID } from "@/types";

const StampModalCloseButton = ({ id }: { id: StampID }) => {
  const dispatch: AppDispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const visible = useSelector(
    (state: RootState) => state.stamps.activeStampVisible
  );

  const onPressButton = () => {
    dispatch(clearActiveStamp(id));
  };

  const animatedOpacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedOpacity.value,
    };
  });
  // Limiting this is absolutely necessary to not glitch out the animation
  useEffect(() => {
    animatedOpacity.value = withTiming(1, { duration: 6000 });
    setTimeout(() => {
      setDisabled(false);
    }, 4000);
  }, [visible]);

  return (
    <Animated.View style={[style.container, animatedStyle]}>
      <TouchableOpacity
        onPress={onPressButton}
        disabled={disabled}
        style={{ flex: 1 }}
      >
        <Ionicons
          size={40}
          name="close-circle"
          color={colors_new.red}
          style={{ flex: 1 }}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: "5%",
    right: "5%",
    justifyContent: "center",
    textAlign: "center",
  },
});

export default StampModalCloseButton;
