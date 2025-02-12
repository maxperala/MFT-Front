/**
 * Settings Menu Component
 *
 * Main settings navigation menu that displays various setting options including
 * language, user preferences, and account management.
 *
 * Features:
 * - Animated entrance transitions
 * - Multiple settings category items
 * - Account deletion option
 * - Localized content
 * - Custom styled containers
 * - Responsive layout with flex positioning
 *
 * @component
 */
import { StyleSheet, Text, View } from "react-native";
import SettingsItem from "./SettingsItem";
import { colors } from "@/colors";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import DeleteAccountButton from "./DeleteAccountButton";

const SettingsMenu = () => {
  const { t } = useTranslation();
  return (
    <Animated.View style={style.container} entering={FadeInLeft.duration(1000)}>
      <View style={style.innerContainer}>
        <Text style={style.text}>{t("settings")}:</Text>
        <SettingsItem
          title={t("language")}
          description={t("language_settings_description")}
          path="language"
          color={colors.gold}
        />
        <SettingsItem
          title={t("user")}
          description={t("user_description")}
          path="token"
          color={colors.light_red}
        />
        <SettingsItem
          title={t("info")}
          description={t("info_description")}
          path="info"
          color={colors.beige}
        />
        <DeleteAccountButton />
      </View>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.dirty_white,
    borderRadius: 6,
    marginBottom: 32,
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    gap: 6,
  },
  text: {
    fontFamily: "SpecialElite-Regular",
    fontSize: 18,
    paddingTop: 15,
    paddingLeft: 12,
  },
});

export default SettingsMenu;
