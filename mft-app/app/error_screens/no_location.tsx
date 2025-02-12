/**
 * No Location Screen Component
 *
 * Error screen displayed when location permissions are not granted.
 *
 * Features:
 * - Full screen overlay with beige background
 * - Displays location permission request message
 * - Provides button to open device settings
 * - Supports internationalization
 *
 * @component
 */
import { View, YStack, Text, Button } from "tamagui";
import { Linking } from "react-native";
import { useTranslation } from "react-i18next";
import { colors } from "@/colors";

const NoLocationScreen = () => {
  const { t } = useTranslation();
  const handleOpenSettings = () => {
    Linking.openSettings();
  };
  return (
    <View
      width="100%"
      height="100%"
      alignItems="center"
      backgroundColor={colors.beige}
      justifyContent="center"
      zIndex={100}
    >
      <YStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        gap="$4"
        padding="$5"
      >
        <Text color={colors.black} fontSize="$5" textAlign="center">
          {t("NSLocationUsageDescription")}
        </Text>
        <Button
          onPress={handleOpenSettings}
          backgroundColor={colors.gold}
          borderWidth="$1"
          borderColor={colors.black}
          color={colors.black}
          size="$5"
        >
          {t("settings")}
        </Button>
      </YStack>
    </View>
  );
};

export default NoLocationScreen;
