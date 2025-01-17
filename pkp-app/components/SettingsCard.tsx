import { colors_new } from "@/colors";
import { StyleSheet } from "react-native";
import SettingsMenu from "./Settings/SettingsMenu";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import LanguageSettings from "./Settings/LanguageSettings";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

const SettingsCard = () => {
  const activePath = useSelector((state: RootState) => state.settings.route);

  const getCorrectScreen = () => {
    switch (activePath) {
      case "language":
        return <LanguageSettings />;
      default:
        return <SettingsMenu />;
    }
  };

  return (
    <Animated.View
      style={style.container}
      exiting={FadeOutLeft.duration(1000)}
      entering={FadeInRight.duration(1000)}
    >
      {getCorrectScreen()}
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: 350,
    backgroundColor: colors_new.dirty_white,
    borderRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.5,
    elevation: 8,
    gap: 10,
  },
  text: {
    fontFamily: "SpecialElite-Regular",
    fontSize: 18,
    paddingTop: 15,
    paddingLeft: 12,
  },
});

export default SettingsCard;
