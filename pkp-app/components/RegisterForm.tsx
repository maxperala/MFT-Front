import { YStack, Button, Input, Text } from "tamagui";
import { colors_new } from "@/colors";
import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { createUser } from "@/state/userReducer";
import { configureLocationPerms } from "@/utils/location/locationUtils";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { createToast } from "@/state/toastReducer";
import { TouchableOpacity } from "react-native";

// This component is my first try at using Reanimated to animate between the two buttons. Forcing the user to allow location before registration.
const RegisterForm = ({ setFormVisible }: { setFormVisible: Function }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState(t("username_placeholder"));
  const dispatch: AppDispatch = useDispatch();

  const AnimatedYStack = useMemo(
    () => Animated.createAnimatedComponent(YStack),
    []
  );
  const AnimatedButton = useMemo(
    () => Animated.createAnimatedComponent(Button),
    []
  );

  const accessStatus = useSelector(
    (state: RootState) => state.location.allowed
  );
  const registerUser = () => {
    try {
      if (username.length < 4) {
        dispatch(createToast(t("username_short"), "notification"));
        return;
      }

      if (username.length > 15) {
        dispatch(createToast(t("username_long"), "notification"));
        return;
      }
      dispatch(createUser({ username, secret_code: uuidv4() }));
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
      }
      console.log(e);
    }
  };

  return (
    <AnimatedYStack
      flex={1}
      gap="$6"
      padding="$4"
      entering={FadeIn}
      exiting={FadeOut}
    >
      <YStack width="100%">
        <Text fontFamily="SpecialElite-Regular" color={colors_new.gold}>
          {t("username")}:
        </Text>
        <Input
          color={colors_new.dirty_white}
          value={username ? username : ""}
          fontFamily="SpecialElite-Regular"
          backgroundColor={colors_new.red}
          width="100%"
          borderWidth="$0"
          borderBottomWidth="$1"
          borderColor={colors_new.dirty_white}
          onChangeText={(v) => (v != username ? setUsername(v) : null)}
        />
      </YStack>

      <Animated.View layout={LinearTransition}>
        {accessStatus ? (
          <YStack justifyContent="center" alignItems="center" gap="$4">
            <AnimatedButton
              backgroundColor={colors_new.gold}
              disabled={!accessStatus}
              fontFamily="SpecialElite-Regular"
              onPress={registerUser}
              width="100%"
              borderRadius={20}
              entering={FadeIn.duration(500)}
              exiting={FadeOut.duration(500)}
            >
              <Text
                color={colors_new.dirty_white}
                fontFamily="SpecialElite-Regular"
              >
                {t("register")}
              </Text>
            </AnimatedButton>
            <TouchableOpacity onPress={() => setFormVisible(false)}>
              <Text
                fontFamily={"Roboto"}
                fontSize={15}
                textDecorationLine="underline"
                color={colors_new.gold}
              >
                Login with token
              </Text>
            </TouchableOpacity>
          </YStack>
        ) : (
          <AnimatedButton
            width="100%"
            backgroundColor={colors_new.dirty_white}
            disabled={accessStatus}
            onPress={() => configureLocationPerms(dispatch)}
            borderRadius={20}
            entering={FadeIn.duration(500)}
            exiting={FadeOut.duration(500)}
          >
            <Text color={colors_new.black} fontFamily="SpecialElite-Regular">
              {t("allow_access")}
            </Text>
          </AnimatedButton>
        )}
      </Animated.View>
    </AnimatedYStack>
  );
};

export default RegisterForm;
