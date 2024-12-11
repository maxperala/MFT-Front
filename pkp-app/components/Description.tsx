import { Postcard } from "@/types";
import { ScrollView, Paragraph, SizableText, YGroup } from "tamagui";

const Description = ({ card, ipsum }: { card: Postcard; ipsum: string }) => {
  return (
    <ScrollView
      padding="$3"
      maxHeight={250}
      backgroundColor="white"
      borderRadius="$4"
    >
      <YGroup gap="$2">
        <YGroup.Item>
          <SizableText fontWeight="bold">Year: 1960 - 1970</SizableText>
        </YGroup.Item>
        <YGroup.Item>
          <SizableText fontWeight="bold">Photographer: Unknown</SizableText>
        </YGroup.Item>
        <YGroup.Item>
          <SizableText fontWeight="bold">
            Provided By: {card.author}
          </SizableText>
        </YGroup.Item>
        <YGroup.Item>
          <Paragraph color="black">{ipsum}</Paragraph>
        </YGroup.Item>
      </YGroup>
    </ScrollView>
  );
};

export default Description;
