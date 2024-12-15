import App from "./app";
import store from "@/state/store";
import { Provider } from "react-redux";
import { TamaguiProvider } from "tamagui";
import tamaguiConfig from "@/tamagui.config";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </TamaguiProvider>
  );
}
