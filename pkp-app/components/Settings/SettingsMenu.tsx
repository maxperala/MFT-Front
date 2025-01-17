import { StyleSheet, Text } from "react-native";
import SettingsItem from "./SettingsItem";
import { colors_new } from "@/colors";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { useTranslation } from "react-i18next";

const SettingsMenu = () => {
  const { t } = useTranslation();
  return (
    <Animated.View style={style.container} entering={FadeInLeft.duration(1000)}>
      <Text style={style.text}>Asetukset:</Text>
      <SettingsItem
        title={t("language")}
        description={t("language_settings_description")}
        path="language"
        color={colors_new.gold}
      />
      <SettingsItem
        title={t("user")}
        description={t("user_description")}
        path="token"
        color={colors_new.light_red}
      />
      <SettingsItem
        title={t("privacy_policy")}
        description={t("privacy_description")}
        path="privacy"
        color={colors_new.beige}
      />
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors_new.dirty_white,
    borderRadius: 6,
    gap: 10,
    marginBottom: 32,
  },
  text: {
    fontFamily: "SpecialElite-Regular",
    fontSize: 18,
    paddingTop: 15,
    paddingLeft: 12,
  },
});

export default SettingsMenu;
