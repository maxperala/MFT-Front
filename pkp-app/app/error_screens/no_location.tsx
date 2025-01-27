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
      backgroundColor={colors_new.red}
      justifyContent="center"
    >
      <YStack flex={1} alignItems="center" justifyContent="center" gap="$4">
        <Text color={colors_new.dirty_white} fontSize="$5">
          {t("no_location_message")}
        </Text>
        <Button
          onPress={handleOpenSettings}
          backgroundColor={colors_new.beige}
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
