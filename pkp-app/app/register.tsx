import { View } from "tamagui";
import colors from "@/colors";
import RegisterForm from "@/components/RegisterForm";

const RegisterScreen = () => {
  return (
    <View flex={1} backgroundColor={colors.amber}>
      <View flex={1 / 2} />
      <View
        flex={1 / 2}
        maxWidth={800}
        alignItems="center"
        justifyContent="flex-start"
      >
        <RegisterForm />
      </View>
    </View>
  );
};

export default RegisterScreen;
