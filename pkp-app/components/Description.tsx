import colors from "@/colors";
import { Postcard } from "@/types";
import { ScrollView, Text, YGroup } from "tamagui";

const Description = ({ card, lang }: { card: Postcard; lang: "fi" | "en" }) => {
  return (
    <ScrollView
      padding="$3"
      maxHeight={300}
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
            Year: {card.year}
          </Text>
        </YGroup.Item>
        <YGroup.Item>
          <Text
            fontWeight="bold"
            color="black"
            fontFamily="SpecialElite-Regular"
          >
            Photographer: {card.photographer}
          </Text>
        </YGroup.Item>
        <YGroup.Item>
          <Text
            fontWeight="bold"
            color="black"
            fontFamily="SpecialElite-Regular"
            paddingBottom="$3"
          >
            Image Source: {card.source}
          </Text>
        </YGroup.Item>
        <YGroup.Item>
          <Text
            color="black"
            fontFamily="SpecialElite-Regular"
            lineHeight="$4"
            fontSize="$4"
          >
            {lang === "fi" ? card.description_fi : card.description_en}
          </Text>
        </YGroup.Item>
      </YGroup>
    </ScrollView>
  );
};

export default Description;
