import colors from "@/colors";
import { Postcard } from "@/types";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, YGroup } from "tamagui";

const Description = ({ card }: { card: Postcard }) => {
  const { t, i18n } = useTranslation();
  return (
    <ScrollView
      padding="$3"
      maxHeight={350}
      backgroundColor={colors.dirty_white}
      borderRadius="$4"
    >
      <YGroup gap="$2">
        <YGroup.Item>
          <Text
            fontWeight="bold"
            color="black"
            fontFamily="SpecialElite-Regular"
          >
            {t("year")}: {card.year}
          </Text>
        </YGroup.Item>
        <YGroup.Item>
          <Text
            fontWeight="bold"
            color="black"
            fontFamily="SpecialElite-Regular"
          >
            {t("photographer")}: {card.photographer}
          </Text>
        </YGroup.Item>
        <YGroup.Item>
          <Text
            fontWeight="bold"
            color="black"
            fontFamily="SpecialElite-Regular"
            paddingBottom="$3"
          >
            {t("source")}: {card.source}
          </Text>
        </YGroup.Item>
        <YGroup.Item>
          <Text
            color="black"
            fontFamily="SpecialElite-Regular"
            lineHeight="$4"
            fontSize="$4"
          >
            {i18n.language === "fi" ? card.description_fi : card.description_en}
          </Text>
        </YGroup.Item>
      </YGroup>
    </ScrollView>
  );
};

export default Description;
