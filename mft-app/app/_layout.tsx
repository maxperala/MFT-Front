/**
 * Root Layout Component
 *
 * Application root wrapper that sets up core providers and configuration.
 *
 * Providers Setup:
 * - TamaguiProvider: UI component theming
 * - I18nextProvider: Internationalization
 * - ToastProvider: Toast notifications
 * - GestureHandlerRootView: Gesture handling
 * - Redux Provider: State management
 *
 * Features:
 * - Global toast notifications system
 * - Gesture handling configuration
 * - Theme and styling setup
 * - State management initialization
 * - Internationalization setup
 *
 * @component
 */
import App from "./app";
import store from "@/state/store";
import { Provider } from "react-redux";
import { TamaguiProvider } from "tamagui";
import { tamaguiConfig } from "@/tamagui.config";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { I18nextProvider } from "react-i18next";
import { colors } from "@/colors";
import i18n from "@/utils/i18n";
import { ToastProvider, ToastViewport } from "@tamagui/toast";
import ToastView from "@/components/misc/Toast";

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <I18nextProvider i18n={i18n}>
        <ToastProvider>
          <GestureHandlerRootView
            style={{ backgroundColor: colors.red, flex: 1 }}
          >
            <Provider store={store}>
              <App />
              <ToastView />
              <ToastViewport
                flexDirection="column"
                top={38}
                left={0}
                right={0}
              />
            </Provider>
          </GestureHandlerRootView>
        </ToastProvider>
      </I18nextProvider>
    </TamaguiProvider>
  );
}
