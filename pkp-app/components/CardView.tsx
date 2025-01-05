import { YStack, Text, Image, View } from "tamagui";
import { colors, colors_new } from "@/colors";
import { Postcard } from "@/types";
import Description from "./Description";
import { useTranslation } from "react-i18next";
import ImageView from "./ImageView";

const CardView = ({ card }: { card: Postcard }) => {
  const { i18n } = useTranslation();
  return (
    <YStack
      flex={1}
      padding="$2"
      paddingTop="$2"
      backgroundColor={colors_new.beige}
      alignItems="center"
      gap="$3"
    >
      <Text
        fontSize="$8"
        fontFamily="MarckScript-Regular"
        textDecorationLine="underline"
        paddingTop="$1"
        color={colors_new.black}
        opacity={0.8}
        zIndex={10}
        textShadowOffset={{ width: 3, height: 1 }}
        textShadowRadius={5}
        shadowColor={colors_new.black}
        shadowOffset={{ width: 3, height: 1 }}
        shadowRadius={5}
        shadowOpacity={0.7}
      >
        {i18n.language === "fi" ? card.title_fi : card.title_en}
      </Text>
      <ImageView card={card} />

      <Description card={card} />
    </YStack>
  );
};

export default CardView;
