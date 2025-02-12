/**
 * Location utilities for managing location permissions and access
 *
 * These functions handle location permissions and dispatch Redux actions
 * for location state management.
 */
import * as Location from "expo-location";
import { AppDispatch } from "@/state/store";
import { setAllowedLoading, setLocationAccess } from "@/state/locationReducer";

/**
 * Configures location permissions and updates Redux state
 * @param dispatch - Redux dispatch function
 */
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

/**
 * Gets current location permission status and updates Redux state
 * @param dispatch - Redux dispatch function
 */
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
