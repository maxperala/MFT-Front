import { colors_new } from "@/colors";
import { Postcard } from "@/types";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, YGroup } from "tamagui";

const Description = ({ card }: { card: Postcard }) => {
  const { t, i18n } = useTranslation();
  return (
    <ScrollView
      padding="$4"
      maxHeight={500}
      backgroundColor={colors_new.dirty_white}
      borderRadius="$3"
    >
      <YGroup gap="$5">
        <YGroup.Item>
          <Text
            color={colors_new.black}
            fontFamily="SpecialElite-Regular"
            lineHeight="$4"
            fontSize="$4"
          >
            {i18n.language === "fi" ? card.description_fi : card.description_en}
          </Text>
        </YGroup.Item>
        <YGroup.Item>
          <Text
            fontWeight="bold"
            color={colors_new.black}
            fontFamily="SpecialElite-Regular"
            paddingBottom="$5"
          >
            {t("source")}: {card.source}
          </Text>
        </YGroup.Item>
      </YGroup>
    </ScrollView>
  );
};

export default Description;
