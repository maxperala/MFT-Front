import { Stack } from "expo-router";
import { useEffect } from "react";
import { AppState, View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/state/store";
import NoLocationScreen from "./error_screens/no_location";
import RegisterScreen from "./register";
import { getUser } from "@/state/userReducer";
import { getLocationStatus } from "@/utils/location/locationUtils";
import CardSheet from "@/components/CardSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LoadingScreen from "./loading-screen";

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
  }, []);

  if (!account.user && !account.loading) {
    return <RegisterScreen />;
  }
  if (!location.allowed) {
    return <NoLocationScreen />;
  }

  return (
    <GestureHandlerRootView style={style.container}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <CardSheet />
      <LoadingScreen />
    </GestureHandlerRootView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
