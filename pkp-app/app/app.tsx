import { Stack } from "expo-router";
import { useEffect } from "react";
import * as Location from "expo-location";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/state/store";
import { setLocationAccess, setUserLocation } from "@/state/locationReducer";
import NoLocationScreen from "./error_screens/no_location";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useSelector((state: RootState) => state.location);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        dispatch(setLocationAccess(true));
      } else {
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      dispatch(
        setUserLocation({
          lat: loc.coords.latitude,
          lon: loc.coords.longitude,
        })
      );
      console.log(location);
    })();
  }, [location]);
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
