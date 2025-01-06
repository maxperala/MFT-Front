import App from "./app";
import store from "@/state/store";
import { Provider } from "react-redux";
import { TamaguiProvider } from "tamagui";
import tamaguiConfig from "@/tamagui.config";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { I18nextProvider } from "react-i18next";
import i18n from "@/utils/i18n";
import colors from "@/colors";
import { ToastProvider, ToastViewport } from "@tamagui/toast";
import ToastView from "@/components/Toast";

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <I18nextProvider i18n={i18n}>
        <ToastProvider>
        <GestureHandlerRootView style={{ backgroundColor: colors.main_red }}>
          <BottomSheetModalProvider>
            <Provider store={store}>
              <App />
              <ToastView />
              <ToastViewport flexDirection="column" top={38} left={0} right={0} />
            </Provider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
        </ToastProvider>
      </I18nextProvider>
    </TamaguiProvider>
  );
}
