import { YStack, Button, Input, Label } from "tamagui";
import colors, { colorsTamagui } from "@/colors";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { createUser } from "@/state/userReducer";
import { configureLocationPerms } from "@/utils/location/locationUtils";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const accessStatus = useSelector(
    (state: RootState) => state.location.allowed
  );
  const registerUser = () => {
    try {
      dispatch(createUser({ username, secret_code: uuidv4() }));
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
      }
      console.log(e);
    }
  };

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
          value={username}
          onChangeText={setUsername}
        />
      </YStack>
      <Button
        backgroundColor={
          !accessStatus ? colorsTamagui.button.secondary : colors.grey
        }
        borderColor={colors.yellow}
        color={colors.white}
        borderWidth={"$1"}
        disabled={accessStatus}
        onPress={async () => await configureLocationPerms(dispatch)}
      >
        Allow location access
      </Button>
      <Button
        backgroundColor={accessStatus ? colors.yellow : colors.grey}
        color={colors.grey}
        borderColor={colors.blue}
        disabled={!accessStatus}
        onPress={registerUser}
      >
        Register
      </Button>
    </YStack>
  );
};

export default RegisterForm;
