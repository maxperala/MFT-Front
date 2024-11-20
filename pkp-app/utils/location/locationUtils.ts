import * as Location from "expo-location";
import { AppDispatch } from "@/state/store";
import { setLocationAccess } from "@/state/locationReducer";

export const configureLocationPerms = async (dispatch: AppDispatch) => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status === "granted") {
    dispatch(setLocationAccess(true));
  } else {
    return;
  }
};
