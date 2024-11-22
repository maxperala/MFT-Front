import { YStack, Button, XStack, Input, Label } from "tamagui";
import colors, { colorsTamagui } from "@/colors";
const RegisterForm = () => {
  return (
    <YStack flex={1} gap={"$8"}>
      <YStack gap={"$1"}>
        <Label color={colors.white}>Username:</Label>
        <Input
          width={"$18"}
          borderWidth={2}
          backgroundColor={colors.sand}
          color={colors.grey}
          fontFamily={"Fair-Prosper"}
          borderColor={colorsTamagui.border.primary}
        />
      </YStack>
      <Button
        backgroundColor={colorsTamagui.button.secondary}
        borderColor={colors.yellow}
        color={colors.white}
        borderWidth={"$1"}
      >
        Allow location access
      </Button>
      <Button
        backgroundColor={colors.yellow}
        color={colors.grey}
        borderColor={colors.blue}
      >
        Register
      </Button>
    </YStack>
  );
};

export default RegisterForm;
