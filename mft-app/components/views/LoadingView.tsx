/**
 * Loading View Component
 *
 * A full-screen loading indicator that displays the app logo and a spinner
 * with custom styling and animations.
 *
 * Features:
 * - Centered logo display
 * - Loading spinner animation
 * - Custom shadow effects
 * - Responsive image scaling
 * - Absolute positioning
 *
 * @component
 */
import { Image, YStack, Spinner } from "tamagui";
import { colors } from "@/colors";

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

      <Spinner size="large" color={colors.beige} />
    </YStack>
  );
};

export default LoadingView;
