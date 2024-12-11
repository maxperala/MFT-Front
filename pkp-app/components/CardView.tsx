import { Postcard } from "@/types";
import { XStack, YStack, Text, Image } from "tamagui";
import { colors } from "@/colors";

const CardView = ({ card }: { card: Postcard | null }) => {
  if (!card) return;
  return (
    <YStack
      flex={1}
      padding="$4"
      backgroundColor={colors.amber}
      alignItems="center"
      gap="$4"
      borderRadius="$4"
    >
      <Text
        fontSize="$8"
        fontWeight="bold"
        fontFamily="Fair-Prosper"
        textDecorationLine="underline"
      >
        {card.title}
      </Text>
      <Image
        source={{
          uri: card.url,
        }}
        width="100%"
        height="50%"
        borderRadius="$4"
        aspectRatio={1}
      />
      <Text fontSize="$4">{card.description}</Text>
    </YStack>
  );
};

export default CardView;
