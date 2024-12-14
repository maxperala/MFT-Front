import { Postcard } from "@/types";
import { ScrollView, Paragraph, SizableText, YGroup } from "tamagui";

const Description = ({ card, lang }: { card: Postcard; lang: "fi" | "en" }) => {
  return (
    <ScrollView
      padding="$3"
      maxHeight={250}
      backgroundColor="white"
      borderRadius="$4"
    >
      <YGroup gap="$2">
        <YGroup.Item>
          <SizableText fontWeight="bold">Year: {card.year}</SizableText>
        </YGroup.Item>
        <YGroup.Item>
          <SizableText fontWeight="bold">
            Photographer: {card.photographer}
          </SizableText>
        </YGroup.Item>
        <YGroup.Item>
          <SizableText fontWeight="bold">
            Image Source: {card.source}
          </SizableText>
        </YGroup.Item>
        <YGroup.Item>
          <Paragraph color="black">
            {lang === "fi" ? card.description_fi : card.description_en}
          </Paragraph>
        </YGroup.Item>
      </YGroup>
    </ScrollView>
  );
};

export default Description;
