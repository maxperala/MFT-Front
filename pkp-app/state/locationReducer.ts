import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coords, UserLocation } from "@/types";
import { AppDispatch } from "./store";
import { Location } from "@maplibre/maplibre-react-native";

const initialState: UserLocation = {
  coords: null,
  allowed: false,
  focused: true,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setAllowed(state, action: PayloadAction<boolean>) {
      return { ...state, allowed: action.payload };
    },
    setLocation(state, action: PayloadAction<Coords>) {
      state.coords = action.payload;
    },
    setFocused(state, action: PayloadAction<boolean>) {
      return { ...state, focused: action.payload };
    },
  },
});
export const { setAllowed, setLocation, setFocused } = locationSlice.actions;

export const setLocationAccess = (status: boolean) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setAllowed(status));
  };
};

export const setUserLocation = (location: Location) => {
  return async (dispatch: AppDispatch) => {
    dispatch(
      setLocation({
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      })
    );
  };
};

export const setFocusedOnUser = (status: boolean) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setFocused(status));
  };
};

export default locationSlice.reducer;
