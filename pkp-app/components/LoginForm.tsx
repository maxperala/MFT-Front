import { colors_new } from "@/colors";
import { AppDispatch } from "@/state/store";
import { loginUserFromPage } from "@/state/userReducer";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";
import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { YStack, Text, Button, Input } from "tamagui";

const LoginForm = ({ setFormVisible }: { setFormVisible: Function }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState(t("username_placeholder"));
  const [token, setToken] = useState(t(""));
  const dispatch: AppDispatch = useDispatch();

  const AnimatedYStack = useMemo(
    () => Animated.createAnimatedComponent(YStack),
    []
  );

  const login = () => {
    dispatch(loginUserFromPage({ username, secret_code: token }));
  };

  return (
    <AnimatedYStack
      flex={1}
      gap="$6"
      entering={FadeInLeft}
      exiting={FadeOutLeft}
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
      <YStack width="100%">
        <Text fontFamily="SpecialElite-Regular" color={colors_new.gold}>
          {t("login_token")}:
        </Text>
        <Input
          color={colors_new.dirty_white}
          value={token ? token : ""}
          fontFamily="SpecialElite-Regular"
          backgroundColor={colors_new.red}
          width="100%"
          borderWidth="$0"
          borderBottomWidth="$1"
          borderColor={colors_new.dirty_white}
          onChangeText={(v) => (v != token ? setToken(v) : null)}
        />
      </YStack>
      <Button
        width="100%"
        backgroundColor={colors_new.gold}
        onPress={login}
        borderRadius={20}
      >
        <Text color={colors_new.dirty_white} fontFamily="SpecialElite-Regular">
          {t("login")}
        </Text>
      </Button>
      <TouchableOpacity
        style={{ paddingLeft: 10, alignSelf: "center", paddingTop: "10%" }}
        onPress={() => setFormVisible(false)}
      >
        <Ionicons name="arrow-back" size={60} color={colors_new.dirty_white} />
      </TouchableOpacity>
    </AnimatedYStack>
  );
};

export default LoginForm;
