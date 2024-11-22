import App from "./app";
import store from "@/state/store";
import { Provider } from "react-redux";
import { TamaguiProvider } from "tamagui";
import tamaguiConfig from "@/tamagui.config";

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Provider store={store}>
        <App />
      </Provider>
    </TamaguiProvider>
  );
}
