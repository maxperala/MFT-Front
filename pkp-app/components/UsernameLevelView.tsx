import { colors_new } from "@/colors";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet } from "react-native";
import { User } from "@/types";
import { XStack, YStack } from "tamagui";
import CurrentSlashTotalCards from "./CurrentSlashTotalCards";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

const UsernameLevelView = ({ profile }: { profile: User }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const unlocked = useSelector(
    (state: RootState) => state.account.user?.unlocked
  )?.length;
  const allCards = useSelector(
    (state: RootState) => state.cardData.cards
  )?.length;
  return (
    <View style={style.container}>
      <XStack
        justifyContent="space-between"
        marginRight="$3"
        alignItems="center"
      >
        <YStack gap="$2" justifyContent="center">
          <Text style={style.label}>{t("name")}:</Text>
          <Text style={style.profileName}>{profile.username}</Text>
        </YStack>
        <Text style={[style.label, { alignSelf: "flex-end" }]}>
          {t("found")}:
        </Text>
      </XStack>
      <XStack justifyContent="space-between" marginRight="$3">
        <YStack gap="$2">
          <Text style={style.label}>{t("level")}:</Text>

          <Text style={style.levelName}>
            {lang === "fi" ? profile.lvl.name_fi : profile.lvl.name_en}
          </Text>
        </YStack>
        <CurrentSlashTotalCards
          current={unlocked ? unlocked : 0}
          total={allCards ? allCards : 0}
          size="$9"
        />
      </XStack>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 2,
    gap: 8,
    backgroundColor: colors_new.dirty_white,
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
  },
  levelName: {
    fontFamily: "SpecialElite-Regular",
    fontSize: 22,
    paddingLeft: 10,
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default UsernameLevelView;
