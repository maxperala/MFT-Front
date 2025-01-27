import * as Location from "expo-location";
import { AppDispatch } from "@/state/store";
import { setAllowedLoading, setLocationAccess } from "@/state/locationReducer";
import { Linking, Alert } from "react-native";
import i18next from "@/utils/i18n";

const showAlert = () => {
  const header = i18next.t("location_perm");
  const msg = i18next.t("NSLocationUsageDescription");
  const settings = i18next.t("settings");
  return new Promise<void>((resolve) => {
    Alert.alert(
      header,
      msg,
      [
        {
          text: settings,
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
    dispatch(setAllowedLoading(false));
  } else {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      dispatch(setLocationAccess(true));
      dispatch(setAllowedLoading(false));
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
    dispatch(setAllowedLoading(false));
    return;
  }
  dispatch(setLocationAccess(false));
  dispatch(setAllowedLoading(false));
};
