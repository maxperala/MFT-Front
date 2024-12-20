import { YStack, Button, Input, Label, XStack } from "tamagui";
import { colors_new } from "@/colors";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { createUser } from "@/state/userReducer";
import { configureLocationPerms } from "@/utils/location/locationUtils";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const accessStatus = useSelector(
    (state: RootState) => state.location.allowed
  );
  const registerUser = () => {
    try {
      if (username.length < 4 || username.length > 10) return;
      dispatch(createUser({ username, secret_code: uuidv4() }));
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
      }
      console.log(e);
    }
  };

  return (
    <YStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      gap="$5"
      padding="$6"
    >
      <YStack width="100%">
        <Label fontFamily="Monserrat" color={colors_new.black}>
          {t("username")}:
        </Label>
        <Input
          color={colors_new.black}
          value={username}
          fontFamily="Monserrat"
          backgroundColor={colors_new.dirty_white}
          width="$25"
          onChangeText={setUsername}
        />
      </YStack>
      <XStack width="100%" alignItems="center" gap="$5">
        <Button
          width="$18"
          backgroundColor={accessStatus ? colors_new.black : colors_new.yellow}
          disabled={accessStatus}
          onPress={() => configureLocationPerms(dispatch)}
        >
          {t("allow_access")}
        </Button>

        <Ionicons
          name={accessStatus ? "checkmark-circle-outline" : "close"}
          color={accessStatus ? colors_new.black : colors_new.black}
          size={50}
        />
      </XStack>
      <Button
        backgroundColor={accessStatus ? colors_new.yellow : colors_new.black}
        disabled={!accessStatus}
        marginTop="$10"
        fontFamily="Monserrat"
        size="$6"
        onPress={registerUser}
      >
        {t("register")}
      </Button>
    </YStack>
  );
};

export default RegisterForm;
