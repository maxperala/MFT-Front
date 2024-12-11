import App from "./app";
import store from "@/state/store";
import { Provider } from "react-redux";
import { TamaguiProvider } from "tamagui";
import tamaguiConfig from "@/tamagui.config";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <GestureHandlerRootView>
        <Provider store={store}>
          <App />
        </Provider>
      </GestureHandlerRootView>
    </TamaguiProvider>
  );
}
