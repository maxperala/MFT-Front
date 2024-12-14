import * as Location from "expo-location";
import { AppDispatch } from "@/state/store";
import { setLocationAccess } from "@/state/locationReducer";
import { Linking, Alert } from "react-native";
import haversine from "haversine-distance";
import { Coords } from "@/types";

const showAlert = () => {
  return new Promise<void>((resolve) => {
    Alert.alert(
      "Location Premission",
      "Please allow the app to use location services to contine",
      [
        {
          text: "Settings",
          onPress: () => resolve(),
        },
      ],
      { cancelable: false }
    );
  });
};

export const configureLocationPerms = async (dispatch: AppDispatch) => {
  let { status } = await Location.getForegroundPermissionsAsync();
  if (status === "granted") {
    dispatch(setLocationAccess(true));
  } else {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      dispatch(setLocationAccess(true));
    } else {
      await showAlert();
      Linking.openSettings();
    }
  }
};

export const getLocationStatus = async (dispatch: AppDispatch) => {
  let { status } = await Location.getForegroundPermissionsAsync();
  if (status === "granted") {
    dispatch(setLocationAccess(true));
    return;
  }
  dispatch(setLocationAccess(false));
};

export const calculateDistance = (a: Coords, b: Coords): number => {
  return haversine([a.lat, a.lon], [b.lat, b.lon]);
};
