import { Stack } from "expo-router";
import { useEffect } from "react";
import { AppState } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/state/store";
import NoLocationScreen from "./error_screens/no_location";
import RegisterScreen from "./register";
import { getUser } from "@/state/userReducer";
import { getLocationStatus } from "@/utils/location/locationUtils";
import CardSheet from "@/components/CardSheet";
import LoadingScreen from "./loading-screen";
import { ToastProvider, ToastViewport } from "@tamagui/toast";
import ToastView from "@/components/Toast";
import { setToast } from "@/state/toastReducer";
import { offlineManager } from "@maplibre/maplibre-react-native";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useSelector((state: RootState) => state.location);
  const account = useSelector((state: RootState) => state.account);

  // Gets the user and location status in the beginning. Adds a listener so that when user goes to change location perms in settings the app knows :))
  useEffect(() => {
    dispatch(getUser());
    getLocationStatus(dispatch);
    const stateListener = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (nextAppState === "active") {
          getLocationStatus(dispatch);
        }

        return () => {
          stateListener.remove();
        };
      }
    );
    // This is for testing the toast
    dispatch(
      setToast({
        type: "discover",
        message: "New location discovered",
        active: true,
      })
    );
  }, []);

  if (!account.user && !account.loading) {
    return <RegisterScreen />;
  }
  if (!location.allowed) {
    return <NoLocationScreen />;
  }

  return (
    <ToastProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <CardSheet />
      <LoadingScreen />

      <ToastView />
      <ToastViewport flexDirection="column" top={38} left={0} right={0} />
    </ToastProvider>
  );
};

export default App;
