import { colors_new } from "@/colors";
import { View, Image, YStack } from "tamagui";
import RegisterForm from "@/components/RegisterForm";

// This still doesn't look quite right. I will come back to this later
const Register = () => {
  return (
    <View
      width="100%"
      height="100%"
      backgroundColor={colors_new.red}
      justifyContent="center"
    >
      <YStack alignItems="center" flex={1} gap="$1">
        <Image
          source={{ uri: require("@/assets/images/logo.png") }}
          width="100%"
          height="100%"
          flex={1}
        />
        <View flex={1} width="90%">
          <RegisterForm />
        </View>
      </YStack>
    </View>
  );
};

export default Register;
