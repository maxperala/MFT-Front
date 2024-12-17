import { YStack, Text, Image, ScrollView } from "tamagui";
import { colors } from "@/colors";
import CardDescription from "./DescriptionTabs";
import { Postcard } from "@/types";

const CardView = ({ card }: { card: Postcard }) => {
  return (
    <YStack
      flex={1}
      padding="$2"
      paddingTop="$2"
      backgroundColor={colors.amber}
      alignItems="center"
      gap="$3"
    >
      <Text
        fontSize="$8"
        fontWeight="bold"
        fontFamily="Fair-Prosper"
        textDecorationLine="underline"
        position="absolute"
        paddingTop="$5"
        color="black"
        opacity={0.5}
        zIndex={10}
      >
        {card.title_fi}
      </Text>
      <Image
        source={{
          uri: card.url,
        }}
        width="100%"
        height="45%"
        borderRadius="$4"
        aspectRatio={1}
        borderColor="white"
        borderWidth="$1"
      />
      <CardDescription card={card} />
    </YStack>
  );
};

export default CardView;
