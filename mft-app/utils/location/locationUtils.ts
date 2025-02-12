import * as Location from "expo-location";
import { AppDispatch } from "@/state/store";
import { setAllowedLoading, setLocationAccess } from "@/state/locationReducer";

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
