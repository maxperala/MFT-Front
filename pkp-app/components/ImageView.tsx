import { colors_new } from "@/colors";
import { Postcard } from "@/types";

import { TouchableOpacity } from "react-native";
import { Image, YStack, Text } from "tamagui";

const ImageView = ({ card }: { card: Postcard }) => {
  return (
    <YStack
      width="90%"
      height="45%"
      justifyContent="center"
      alignItems="center"
      shadowOpacity={0.3}
      shadowOffset={{ width: 0, height: 6 }}
      shadowRadius={6}
      shadowColor={colors_new.black}
      backgroundColor={colors_new.dirty_white}
      paddingTop="$3"
      paddingLeft="$0"
      paddingRight="$0"
    >
      <Image
        source={{
          uri: card.url,
        }}
        flex={1}
        borderRadius="$0"
        aspectRatio={1}
      />
      <Text
        color={colors_new.black}
        fontFamily="Fair-Prosper"
        alignSelf="flex-end"
        marginRight="$5"
        opacity={0.8}
      >
        {card.photographer} {card.year}
      </Text>
    </YStack>
  );
};

export default ImageView;
