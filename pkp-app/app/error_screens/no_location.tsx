import { View, YStack, Text, Button } from "tamagui";
import { Linking } from "react-native";
import { useTranslation } from "react-i18next";
// VIP
const noLocationScreen = () => {
  const { t } = useTranslation();
  const handleOpenSettings = () => {
    Linking.openSettings();
  };

  return (
    <View
      flex={1}
      alignItems="center"
      backgroundColor="white"
      justifyContent="center"
    >
      <YStack flex={1} alignItems="center" justifyContent="center" gap="$2">
        <Text color="black">{t("no_location_message")}</Text>
        <Button onPress={handleOpenSettings}>Settings</Button>
      </YStack>
    </View>
  );
};

export default noLocationScreen;
