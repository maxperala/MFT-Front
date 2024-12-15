import { View, YStack, Text, Button } from "tamagui";
import { Linking } from "react-native";
// VIP
const noLocationScreen = () => {
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
        <Text color="black">
          This app requires location prevlidges to use...
        </Text>
        <Button onPress={handleOpenSettings}>Settings</Button>
      </YStack>
    </View>
  );
};

export default noLocationScreen;
