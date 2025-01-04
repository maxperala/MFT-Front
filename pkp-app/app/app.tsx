import { Stack } from "expo-router";
import { useEffect } from "react";
import { View, AppState, StyleSheet } from "react-native";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/colors";
import { getAllPacks } from "@/state/packsReducer";
import FullScreenImage from "@/components/FullScreenImage";
import BackNavigator from "@/components/BackNavigator";
import * as Font from "expo-font";
const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useSelector((state: RootState) => state.location.allowed);
  const account = useSelector((state: RootState) => state.account);

  const insets = useSafeAreaInsets();
  // Gets the user and location status in the beginning. Adds a listener so that when user goes to change location perms in settings the app knows :))
  useEffect(() => {
    dispatch(getUser());
    getLocationStatus(dispatch);
    console.log(Font.getLoadedFonts());
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
  // This is to fetch all the packs. I would do it in the user thunk actions but then it forms a require cycle.
  useEffect(() => {
    if (account.user) {
      dispatch(getAllPacks());
    }
  }, [account]);

  if (!account.user && !account.loading) {
    return <RegisterScreen />;
  }
  if (!location) {
    return <NoLocationScreen />;
  }

  return (
    <ToastProvider>
      <View style={[style.app, { paddingTop: insets.top }]}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="postcard/[id]"
            options={{ header: () => <BackNavigator /> }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <CardSheet />
        <FullScreenImage />
        <LoadingScreen />
        <ToastView />
        <ToastViewport flexDirection="column" top={38} left={0} right={0} />
      </View>
    </ToastProvider>
  );
};

const style = StyleSheet.create({
  app: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.main_red,
  },
});

export default App;
