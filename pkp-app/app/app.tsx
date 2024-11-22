import { Stack } from "expo-router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/state/store";
import NoLocationScreen from "./error_screens/no_location";
import { configureLocationPerms } from "@/utils/location/locationUtils";
import RegisterScreen from "./register";
import { getUser } from "@/state/userReducer";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useSelector((state: RootState) => state.location);
  const account = useSelector((state: RootState) => state.account);
  useEffect(() => {
    configureLocationPerms(dispatch);
    dispatch(getUser);
  }, [location.allowed]);

  if (!account.user) {
    return <RegisterScreen />;
  }
  if (!location.allowed) {
    return <NoLocationScreen />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default App;
