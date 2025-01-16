import { colors_new } from "@/colors";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet } from "react-native";
import { User } from "@/types";

const UsernameLevelView = ({ profile }: { profile: User }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  return (
    <View style={style.container}>
      <Text style={style.label}>{t("name")}:</Text>
      <Text style={style.profileName}>{profile.username}</Text>
      <Text style={style.label}>{t("level")}:</Text>
      <Text style={style.levelName}>
        {lang === "fi" ? profile.lvl.name_fi : profile.lvl.name_en}
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 2,
    gap: 8,
    backgroundColor: colors_new.card_white,
    padding: 8,
  },
  label: {
    fontFamily: "SpecialElite-Regular",
    fontSize: 18,
  },
  profileName: {
    fontFamily: "MarckScript-Regular",
    fontSize: 24,
    paddingLeft: 10,
    paddingBottom: 4,
  },
  levelName: {
    fontFamily: "SpecialElite-Regular",
    fontSize: 22,
    paddingLeft: 10,
  },
});

export default UsernameLevelView;
