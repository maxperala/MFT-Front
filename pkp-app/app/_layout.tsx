import { Stack } from "expo-router";
import { useEffect } from "react";
import * as Location from "expo-location";

export default function RootLayout() {
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("This app needs location premissions to operate");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
    })();
  });
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
