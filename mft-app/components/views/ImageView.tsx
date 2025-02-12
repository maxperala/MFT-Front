/**
 * Image View Component
 *
 * Displays postcard images with photographer credits in a styled container,
 * supporting both modal and inline viewing modes.
 *
 * Features:
 * - Modal/inline view modes
 * - Photographer credit display
 * - Custom shadow effects
 * - Responsive image scaling
 * - Touch interaction handling
 * - Redux state integration
 *
 * @component
 */
import { colors } from "@/colors";
import { setPicture } from "@/state/pictureReducer";
import { Postcard } from "@/types";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { YStack, Text } from "tamagui";

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
      width="80%"
      aspectRatio={1}
      justifyContent="center"
      alignItems="center"
      shadowOpacity={0.3}
      shadowOffset={{ width: 0, height: 6 }}
      shadowRadius={6}
      shadowColor={colors.black}
      backgroundColor={colors.dirty_white}
      elevation={8}
    >
      <TouchableOpacity
        onPress={
          toSheet ? () => router.push(`/postcard/${card.id}`) : setFullScreen
        }
        style={{
          width: "95%",
          paddingTop: "2%",
          gap: "2%",
          aspectRatio: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: card.url,
          }}
          style={{
            flex: 1,
            borderRadius: 0,
            aspectRatio: 1,
            objectFit: "contain",
          }}
          cachePolicy="memory-disk"
        />
        <Text
          color={colors.black}
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
