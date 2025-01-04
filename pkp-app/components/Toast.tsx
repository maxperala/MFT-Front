import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "@tamagui/toast";
import { setToast } from "@/state/toastReducer";
import { colors_new } from "@/colors";
import { Text, View, Image } from "tamagui";
import { useEffect } from "react";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";
/**
 * This is a Toast to be shown mainly when a new location is discovered.
 * It has another type as well, notification. I will probably use this for something
 * but at this point it is not implemented at all.
 * Haptics are used to enhance the experience of discovering a new location.
 * The photo icon needs to be made white to fit with the theme... I will just generate a white png at some point.
 *
 */
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
        toastData.type === "discover" ? colors_new.gold : colors_new.dark_red
      }
      borderColor={colors_new.dirty_white}
      borderWidth="$0.5"
      shadowColor="black"
      shadowOffset={{ width: 2, height: 4 }}
      shadowOpacity={0.5}
      shadowRadius={5}
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
          <Toast.Description color={colors_new.dirty_white}>
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
