import App from "./app";
import store from "@/state/store";
import { Provider } from "react-redux";
export default function RootLayout() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
