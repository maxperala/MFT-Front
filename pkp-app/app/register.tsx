import { colors_new } from "@/colors";
import { View, YStack, Text } from "tamagui";
import { Image } from "expo-image";
import RegisterForm from "@/components/RegisterForm";
import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import { ScrollView, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import PrivacyPolicyView from "@/components/PrivacyPolicyView";
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
        backgroundColor: colors_new.red,
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
          color={colors_new.light_grey}
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
