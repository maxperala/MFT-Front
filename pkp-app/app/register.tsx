import { colors_new } from "@/colors";
import { View, Image, YStack, Text } from "tamagui";
import RegisterForm from "@/components/RegisterForm";
import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import { ScrollView, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import PrivacyPolicyView from "@/components/PrivacyPolicyView";

const Register = () => {
  const [registerFrom, setRegisterForm] = useState(true);
  const [policyVisible, setPolicyVisible] = useState(false);
  const { t } = useTranslation();

  return (
    <ScrollView
      contentContainerStyle={{
        width: "100%",
        height: "100%",
        backgroundColor: colors_new.red,
        justifyContent: "center",
      }}
      automaticallyAdjustKeyboardInsets={true}
      keyboardShouldPersistTaps={"always"}
    >
      <YStack alignItems="center" flex={1} gap="$1">
        <Image
          source={{ uri: require("@/assets/images/logo.png") }}
          width="100%"
          height="100%"
          flex={1}
        />
        <View flex={1} width="90%">
          {registerFrom ? (
            <RegisterForm setFormVisible={setRegisterForm} />
          ) : (
            <LoginForm
              setFormVisible={(val: boolean) => setRegisterForm(!val)}
            />
          )}
        </View>
      </YStack>
      <TouchableOpacity onPress={() => setPolicyVisible(true)}>
        <Text
          color={colors_new.light_grey}
          fontSize="$1"
          position="absolute"
          alignSelf="center"
          bottom="$8"
          textAlign="center"
        >
          {t("by_using_service")}
          {"\n"}
          <Text
            color={colors_new.dirty_white}
            textDecorationLine="underline"
            fontSize="$3"
          >
            {t("privacy_policy_bottom")}
          </Text>
        </Text>
      </TouchableOpacity>
      {policyVisible ? (
        <PrivacyPolicyView showPolicy={setPolicyVisible} />
      ) : null}
    </ScrollView>
  );
};

export default Register;
