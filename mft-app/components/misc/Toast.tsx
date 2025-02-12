/**
 * Toast Component
 *
 * A notification component that displays temporary messages with different styles
 * for discoveries and errors, featuring animations and custom styling.
 *
 * Features:
 * - Animated enter/exit transitions
 * - Conditional styling based on message type
 * - Haptic feedback integration
 * - Custom icons and typography
 * - Automatic dismissal
 * - Redux state management
 *
 * @component
 */
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "@tamagui/toast";
import { setToast } from "@/state/toastReducer";
import { colors } from "@/colors";
import { Text, View, Image } from "tamagui";
import { useEffect } from "react";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";

const ToastView = () => {
  const toastData = useSelector((state: RootState) => state.toast);
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const closeToast = () => {
    dispatch(setToast({ type: null, message: null, active: false }));
  };
  useEffect(() => {
    if (toastData.active) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [toastData.active]);

  return (
    <Toast
      open={toastData.active}
      onOpenChange={closeToast}
      animation="100ms"
      enterStyle={{ x: -20, opacity: 0 }}
      exitStyle={{ x: -20, opacity: 0 }}
      x={0}
      duration={3000}
      backgroundColor={
        toastData.type === "discover" ? colors.gold : colors.dark_red
      }
      borderColor={colors.dirty_white}
      borderWidth="$0.5"
      shadowColor="black"
      shadowOffset={{ width: 2, height: 4 }}
      shadowOpacity={0.5}
      shadowRadius={5}
      elevation={8}
    >
      <View
        flex={1}
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        gap="$2"
        zIndex={200}
      >
        {toastData.type === "discover" ? (
          <Image
            source={{
              uri: require("@/assets/images/discovered-marker.png"),
            }}
            width="50"
            height="50"
          />
        ) : null}

        <View>
          <Toast.Title>
            <Text fontSize="$4" fontFamily="SpecialElite-Regular">
              {toastData.type === "discover"
                ? t("discovered_message")
                : t("error_occurred")}
            </Text>
          </Toast.Title>
          <Toast.Description color={colors.dirty_white}>
            <Text fontSize="$5" fontFamily="SpecialElite-Regular">
              {toastData.message}
            </Text>
          </Toast.Description>
        </View>
      </View>
    </Toast>
  );
};

export default ToastView;
