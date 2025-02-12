import { Image, YStack, Spinner } from "tamagui";
import { colors_new } from "@/colors";

const LoadingView = () => {
  return (
    <YStack
      position="absolute"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Image
        source={{
          uri: require("@/assets/images/logo.png"),
        }}
        width="60%"
        height="50%"
        objectFit="contain"
        marginTop="$13"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.3}
        shadowRadius={6}
      />

      <Spinner size="large" color={colors_new.beige} />
    </YStack>
  );
};

export default LoadingView;
