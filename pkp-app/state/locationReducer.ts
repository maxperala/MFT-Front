import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserLocation, Location } from "@/types";
import { AppDispatch } from "./store";
const initialState: UserLocation = {
  lat: 0,
  lon: 0,
  allowed: false,
  focused: true,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setAllowed(state, action: PayloadAction<boolean>) {
      state.allowed = action.payload;
    },
    setLocation(state, action: PayloadAction<{ lat: number; lon: number }>) {
      state.lat = action.payload.lat;
      state.lon = action.payload.lon;
    },
    setFocused(state, action: PayloadAction<boolean>) {
      state.focused = action.payload;
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
    dispatch(setLocation(location));
  };
};

export const setFocusedOnUser = (status: boolean) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setFocused(status));
  };
};

export default locationSlice.reducer;
