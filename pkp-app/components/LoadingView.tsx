import { Image, YStack, H2, Spinner } from "tamagui";
import { colors } from "@/colors";

const LoadingView = () => {
  return (
    <YStack flex={1} alignItems="center" justifyContent="center">
      <Image
        source={{
          uri: require("@/assets/images/marker-x.png"),
        }}
        width="100"
        height="100"
      />
      <H2 color={colors.white}>Postcards from Pyynikki</H2>
      <Spinner size="large" color={colors.amber} />
    </YStack>
  );
};

export default LoadingView;
