import { YStack, Text, Image } from "tamagui";
import { colors } from "@/colors";
import { Postcard } from "@/types";
import Description from "./Description";
import { useTranslation } from "react-i18next";

const CardView = ({ card }: { card: Postcard }) => {
  const { i18n } = useTranslation();
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
        paddingTop="$1"
        color={colors.white}
        opacity={1}
        zIndex={10}
      >
        {i18n.language === "fi" ? card.title_fi : card.title_en}
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
      <Description card={card} />
    </YStack>
  );
};

export default CardView;
