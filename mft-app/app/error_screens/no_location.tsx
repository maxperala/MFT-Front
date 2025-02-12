import { View, YStack, Text, Button } from "tamagui";
import { Linking } from "react-native";
import { useTranslation } from "react-i18next";
import { colors_new } from "@/colors";
// VIP
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
      backgroundColor={colors_new.beige}
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
        <Text color={colors_new.black} fontSize="$5" textAlign="center">
          {t("NSLocationUsageDescription")}
        </Text>
        <Button
          onPress={handleOpenSettings}
          backgroundColor={colors_new.gold}
          borderWidth="$1"
          borderColor={colors_new.black}
          color={colors_new.black}
          size="$5"
        >
          {t("settings")}
        </Button>
      </YStack>
    </View>
  );
};

export default NoLocationScreen;
