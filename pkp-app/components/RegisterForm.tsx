import { YStack, Button, Input, Text } from "tamagui";
import { colors_new } from "@/colors";
import { useState } from "react";
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

// This component is my first try at using Reanimated to animate between the two buttons. Forcing the user to allow location before registration.
const RegisterForm = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState(t("username_placeholder"));
  const dispatch: AppDispatch = useDispatch();

  const AnimatedButton = Animated.createAnimatedComponent(Button);

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
    <YStack flex={1} gap="$6" padding="$4">
      <YStack width="100%">
        <Text fontFamily="SpecialElite-Regular" color={colors_new.gold}>
          {t("username")}:
        </Text>
        <Input
          color={colors_new.dirty_white}
          value={username}
          fontFamily="SpecialElite-Regular"
          backgroundColor={colors_new.red}
          width="100%"
          borderWidth="$0"
          borderBottomWidth="$1"
          borderColor={colors_new.dirty_white}
          onChangeText={setUsername}
        />
      </YStack>

      <Animated.View layout={LinearTransition}>
        {accessStatus ? (
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
            {/* This has POOR CONTRAST, FIND A BETTER COLOR */}
            <Text
              color={colors_new.dirty_white}
              fontFamily="SpecialElite-Regular"
            >
              {t("register")}
            </Text>
          </AnimatedButton>
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
    </YStack>
  );
};

export default RegisterForm;
