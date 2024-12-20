import { View } from "tamagui";
import { colors_new } from "@/colors";
import RegisterForm from "@/components/RegisterForm";

const RegisterScreen = () => {
  return (
    <View width="100%" height="100%" backgroundColor={colors_new.beige}>
      <RegisterForm />
    </View>
  );
};

export default RegisterScreen;
