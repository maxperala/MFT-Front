/**
 * Collection View Component
 *
 * A paginated view component that displays unlocked postcards with navigation
 * arrows and swipe functionality.
 *
 * Features:
 * - Horizontal pager navigation
 * - Card filtering by unlock status
 * - Navigation arrow controls
 * - Card counter display
 * - Swipe instruction text
 * - Custom font styling
 *
 * @component
 */
import { colors } from "@/colors";
import { RootState } from "@/state/store";
import { Postcard } from "@/types";
import { useSelector } from "react-redux";
import PagerView from "react-native-pager-view";
import { StyleSheet, View } from "react-native";
import { Text, XStack, YStack } from "tamagui";
import ImageView from "./ImageView";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import CurrentSlashTotalCards from "../header/CurrentSlashTotalCards";

const CollectionView = () => {
  const cards = useSelector((state: RootState) => state.cardData.cards);
  const unlocked = useSelector(
    (state: RootState) => state.account.user?.unlocked
  );
  const { t, i18n } = useTranslation();

  const filteredCards = useMemo(() => {
    return cards?.filter((card: Postcard) => {
      if (unlocked?.includes(card.id)) {
        return true;
      }
      return false;
    });
  }, [unlocked, cards]);

  const backArrow = () => {
    return (
      <Ionicons
        name="arrow-back"
        size={35}
        color={colors.black}
        style={{
          opacity: 0.5,
          shadowOffset: { width: 1, height: 3 },
          shadowRadius: 3,
          shadowOpacity: 0.3,
          paddingLeft: 5,
        }}
      />
    );
  };

  const forwardArrow = () => {
    return (
      <Ionicons
        name="arrow-forward"
        size={35}
        color={colors.black}
        style={{
          opacity: 0.5,
          shadowOffset: { width: 1, height: 3 },
          shadowRadius: 3,
          shadowOpacity: 0.3,
          paddingRight: 5,
        }}
      />
    );
  };

  const createArrow = (i: number) => {
    const length = filteredCards?.length;
    if (!length) {
      return null;
    }
    return (
      <YStack justifyContent="space-between" alignItems="center">
        <XStack justifyContent="space-between" width="100%" padding="$3">
          {i > 0 ? backArrow() : <View style={{ width: 35 }} />}
          <CurrentSlashTotalCards
            current={i + 1}
            total={filteredCards.length}
          />
          {length - 1 > i ? forwardArrow() : <View style={{ width: 35 }} />}
        </XStack>
        <Text
          fontFamily="Fair-Prosper"
          opacity={0.7}
          fontSize="$4"
          color={colors.black}
        >
          {t("swipe")}
        </Text>
      </YStack>
    );
  };

  return (
    <PagerView
      style={style.container}
      key={filteredCards ? filteredCards.length : 0}
    >
      {filteredCards && filteredCards.length > 0 ? (
        filteredCards.map((card: Postcard, i) => {
          return (
            <View
              key={i}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                fontFamily="MarckScript-Regular"
                fontSize="$7"
                paddingBottom="$4"
                color={colors.black}
              >
                {i18n.language === "fi" ? card.title_fi : card.title_en}
              </Text>
              <ImageView card={card} toSheet={true} />
              {createArrow(i)}
            </View>
          );
        })
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            fontFamily="Fair-Prosper"
            opacity={0.5}
            color={colors.black}
            textAlign="center"
            shadowOffset={{ width: 1, height: 2 }}
            shadowRadius={5}
            shadowOpacity={0.6}
            textShadowOffset={{ width: 1, height: 2 }}
            textShadowRadius={5}
          >
            {t("nothing_here")}
          </Text>
        </View>
      )}
    </PagerView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.beige,
    flex: 1,
  },
});

export default CollectionView;
