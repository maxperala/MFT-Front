import { colors_new } from "@/colors";
import { setPicture } from "@/state/pictureReducer";
import { Postcard } from "@/types";
import { useRouter } from "expo-router";

import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { Image, YStack, Text } from "tamagui";

const ImageView = ({
  card,
  toSheet = false,
}: {
  card: Postcard;
  toSheet?: boolean;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const setFullScreen = () => {
    dispatch(setPicture(card.url));
  };
  return (
    <YStack
      width="85%"
      height="45%"
      justifyContent="center"
      alignItems="center"
      shadowOpacity={0.3}
      shadowOffset={{ width: 0, height: 6 }}
      shadowRadius={6}
      shadowColor={colors_new.black}
      backgroundColor={colors_new.dirty_white}
      elevation={8}
      paddingTop="$3"
      paddingLeft="$0"
      paddingRight="$0"
    >
      <TouchableOpacity
        onPress={
          toSheet ? () => router.push(`/postcard/${card.id}`) : setFullScreen
        }
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
      </TouchableOpacity>
    </YStack>
  );
};

export default ImageView;
