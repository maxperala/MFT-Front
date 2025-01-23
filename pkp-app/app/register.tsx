import { colors_new } from "@/colors";
import { View, Image, YStack } from "tamagui";
import RegisterForm from "@/components/RegisterForm";
import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import { ScrollView } from "react-native";

const Register = () => {
  const [registerFrom, setRegisterForm] = useState(true);

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
    </ScrollView>
  );
};

export default Register;
