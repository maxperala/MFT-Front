/**
 * Register Screen Component
 *
 * Main authentication screen that handles both registration and login flows.
 * Features:
 * - Toggles between registration and login forms
 * - Displays privacy policy when needed
 * - Shows onboarding for new users
 * - Includes branding and logo
 * - Supports internationalization
 *
 * Flow:
 * 1. Checks if onboarding is complete
 * 2. Shows privacy policy if requested
 * 3. Toggles between registration/login forms
 *
 * @component
 */
import { colors } from "@/colors";
import { View, YStack, Text } from "tamagui";
import { Image } from "expo-image";
import RegisterForm from "@/components/forms/RegisterForm";
import { useState } from "react";
import LoginForm from "@/components/forms/LoginForm";
import { ScrollView, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import PrivacyPolicyView from "@/components/views/PrivacyPolicyView";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import OnboardingViewer from "./onboarding";

const Register = () => {
  const [registerFrom, setRegisterForm] = useState(true);
  const [policyVisible, setPolicyVisible] = useState(false);
  const { t } = useTranslation();
  const [username, setUsername] = useState(t("username_placeholder"));
  const introSeen = useSelector((state: RootState) => state.settings.introSeen);

  if (!introSeen) {
    return <OnboardingViewer />;
  }
  return (
    <ScrollView
      contentContainerStyle={{
        width: "100%",
        height: "100%",
        backgroundColor: colors.red,
        paddingTop: "20%",
        justifyContent: "center",
      }}
      automaticallyAdjustKeyboardInsets={true}
      keyboardShouldPersistTaps={"always"}
    >
      <YStack alignItems="center" flex={1} gap="$1">
        <Image
          source={require("@/assets/images/logo.png")}
          style={{ width: "70%", aspectRatio: 1 }}
        />

        <View flex={1} width="90%">
          {registerFrom ? (
            <RegisterForm
              setFormVisible={setRegisterForm}
              username={username}
              setUsername={setUsername}
            />
          ) : (
            <LoginForm
              setFormVisible={(val: boolean) => setRegisterForm(!val)}
              existingUsername={username}
            />
          )}
        </View>
      </YStack>
      <TouchableOpacity onPress={() => setPolicyVisible(true)}>
        <Text
          color={colors.light_grey}
          fontSize="$1"
          position="absolute"
          bottom="$3"
          alignSelf="center"
          textAlign="center"
          paddingBottom="6%"
        >
          {t("by_using_service")}
        </Text>
      </TouchableOpacity>
      {policyVisible ? (
        <PrivacyPolicyView showPolicy={setPolicyVisible} />
      ) : null}
    </ScrollView>
  );
};

export default Register;
