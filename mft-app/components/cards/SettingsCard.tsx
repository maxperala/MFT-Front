/**
 * Settings Card Component
 *
 * A container component that manages the display of different settings screens
 * with animated transitions between views.
 *
 * Features:
 * - Dynamic screen rendering based on route
 * - Animated screen transitions
 * - Styled card container with shadow
 * - Redux integration for route management
 * - Language settings support
 *
 * @component
 */
import { colors } from "@/colors";
import { StyleSheet } from "react-native";
import SettingsMenu from "../settings/SettingsMenu";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import LanguageSettings from "../settings/LanguageSettings";
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
    height: 400,
    backgroundColor: colors.dirty_white,
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
