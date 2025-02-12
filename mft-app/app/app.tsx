/**
 * Root Application Component
 *
 * Manages the core application structure and initialization, including:
 * - Authentication state management
 * - Navigation stack configuration
 * - Location services setup
 * - Language initialization
 * - Pack and stamp data fetching
 *
 * Features:
 * - Conditional rendering based on authentication
 * - Safe area insets handling
 * - App state monitoring for location updates
 * - Modal components for cards and full-screen images
 * - Stack navigation with custom headers
 *
 * @component
 */
import { Stack } from "expo-router";
import { useEffect } from "react";
import { View, AppState, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/state/store";
import RegisterScreen from "./register";
import { getUser } from "@/state/userReducer";
import { getLocationStatus } from "@/utils/location/locationUtils";
import CardSheet from "@/components/cards/CardSheet";
import LoadingScreen from "./loading-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/colors";
import { getAllPacks } from "@/state/packsReducer";
import FullScreenImage from "@/components/misc/FullScreenImage";
import BackNavigator from "@/components/cards/BackNavigator";
import { getAllStamps } from "@/state/stampsReducer";
import { checkIntroSeen, initSavedLanguage } from "@/state/settingsReducer";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const account = useSelector((state: RootState) => state.account);
  const activeCard = useSelector((state: RootState) => state.cardData.active);

  const insets = useSafeAreaInsets();
  // Gets the user and location status in the beginning. Adds a listener so that when user goes to change location perms in settings the app knows :))
  useEffect(() => {
    dispatch(initSavedLanguage());
    dispatch(getUser());
    dispatch(checkIntroSeen());
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
  // This is to fetch all the packs. I would do it in the user thunk actions but then it forms a require cycle.
  useEffect(() => {
    if (account.user) {
      dispatch(getAllPacks());
      dispatch(getAllStamps());
    }
  }, [account]);

  if (!account.user && !account.loading) {
    return <RegisterScreen />;
  }

  return (
    <View style={[style.app, { paddingTop: insets.top }]}>
      <LoadingScreen />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="postcard/[id]"
          options={{ header: () => <BackNavigator /> }}
        />
        <Stack.Screen name="+not-found" />
        <Stack.Screen
          name="info_page"
          options={{ header: () => <BackNavigator /> }}
        />
      </Stack>
      {activeCard ? <CardSheet card={activeCard} /> : null}
      <FullScreenImage />
    </View>
  );
};

const style = StyleSheet.create({
  app: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.red,
  },
});

export default App;
