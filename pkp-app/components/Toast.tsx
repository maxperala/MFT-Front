import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "@tamagui/toast";
import { setToast } from "@/state/toastReducer";
import { colors } from "@/colors";
import { Text, View } from "tamagui";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

const ToastView = () => {
  const toastData = useSelector((state: RootState) => state.toast);
  const dispatch: AppDispatch = useDispatch();
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
      backgroundColor={colors.amber}
      borderColor={colors.white}
      borderWidth="$0.5"
    >
      <Toast.Description color={colors.white}>
        <View
          flex={1}
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          gap="$2"
        >
          <Ionicons name="trophy" color="white" size={15} />
          <Text fontSize="$5" fontWeight="bold">
            {toastData.message}
          </Text>
        </View>
      </Toast.Description>
    </Toast>
  );
};

export default ToastView;
