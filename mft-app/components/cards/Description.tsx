/**
 * Description Component
 *
 * Renders a scrollable text description for a postcard with localized content
 * and source attribution in a styled container.
 *
 * Features:
 * - Localized content (Finnish/English)
 * - Scrollable container with max height
 * - Custom font styling
 * - Source attribution display
 * - Consistent theme-based styling
 *
 * @component
 */
import { colors } from "@/colors";
import { Postcard } from "@/types";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, YGroup } from "tamagui";

const Description = ({ card }: { card: Postcard }) => {
  const { t, i18n } = useTranslation();
  return (
    <ScrollView
      padding="$4"
      maxHeight={500}
      backgroundColor={colors.dirty_white}
      borderRadius="$3"
    >
      <YGroup gap="$5">
        <YGroup.Item>
          <Text
            color={colors.black}
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
            color={colors.black}
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
