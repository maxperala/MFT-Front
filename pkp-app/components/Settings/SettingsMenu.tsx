import { StyleSheet, Text, View } from "react-native";
import SettingsItem from "./SettingsItem";
import { colors_new } from "@/colors";
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
          color={colors_new.gold}
        />
        <SettingsItem
          title={t("user")}
          description={t("user_description")}
          path="token"
          color={colors_new.light_red}
        />
        <SettingsItem
          title={t("info")}
          description={t("info_description")}
          path="info"
          color={colors_new.beige}
        />
        <DeleteAccountButton />
      </View>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: colors_new.dirty_white,
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
