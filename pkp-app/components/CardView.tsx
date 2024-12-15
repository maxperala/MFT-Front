import { YStack, Text, Image } from "tamagui";
import { colors } from "@/colors";
import CardDescription from "./DescriptionTabs";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Spinner } from "tamagui";

const CardView = () => {
  const card = useSelector((state: RootState) => state.cardData.active);
  if (!card) return <Spinner size="large" color={colors.yellow} />;
  return (
    <YStack
      flex={1}
      padding="$4"
      paddingTop="$2"
      backgroundColor={colors.amber}
      alignItems="center"
      gap="$4"
    >
      <Text
        fontSize="$8"
        fontWeight="bold"
        fontFamily="Fair-Prosper"
        textDecorationLine="underline"
      >
        {card.title_fi}
      </Text>
      <Image
        source={{
          uri: card.url,
        }}
        width="100%"
        height="40%"
        borderRadius="$4"
        aspectRatio={1}
        borderColor="white"
        borderWidth="$1"
      />
      <CardDescription />
    </YStack>
  );
};

export default CardView;
