import { colors_new } from "@/colors";
import { Stamp } from "@/types";
import { View, StyleSheet, Text } from "react-native";
import { useMemo } from "react";
import ModalStampImage from "./ModalStampImageAndDescription";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import StampModalCloseButton from "./StampModalCloseButton";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import StampAnimation from "./StampAnimation";

const StampModal = ({ stamp }: { stamp: Stamp }) => {
  const viewed = useSelector((state: RootState) => state.stamps.viewedStamps);
  const { t } = useTranslation();
  const isNew = useMemo(() => {
    return !viewed.includes(stamp.id);
  }, [viewed, stamp]);

  return (
    <Animated.View
      style={style.container}
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(500)}
    >
      <View style={style.innerContainer}>
        {isNew ? (
          <Text style={style.heading}>{t("stamp_unlocked")}</Text>
        ) : null}
        <ModalStampImage stamp={stamp} />
        <StampAnimation />
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
