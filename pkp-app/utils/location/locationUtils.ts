import * as Location from "expo-location";
import { AppDispatch } from "@/state/store";
import { setAllowedLoading, setLocationAccess } from "@/state/locationReducer";
import { Linking, Alert } from "react-native";

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
    dispatch(setAllowedLoading(false))
    return;
  }
  dispatch(setLocationAccess(false));
  dispatch(setAllowedLoading(true));
};
