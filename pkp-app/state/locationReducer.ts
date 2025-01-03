import {
  createSlice,
  PayloadAction,
  ThunkAction,
  UnknownAction,
} from "@reduxjs/toolkit";
import { Coords, UserLocation } from "@/types";
import { AppDispatch, RootState } from "./store";
import { Location } from "@maplibre/maplibre-react-native";

const initialState: UserLocation = {
  coords: null,
  allowed: false,
  focused: false,
  zoom: 10,
  mapLoading: true,
  packExists: true,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setAllowed(state, action: PayloadAction<boolean>) {
      return { ...state, allowed: action.payload };
    },
    setLocation(state, action: PayloadAction<Coords>) {
      return {
        ...state,
        coords: {
          lat: action.payload.lat,
          lon: action.payload.lon,
          heading: state.coords?.heading,
        },
      };
    },
    setFocused(state, action: PayloadAction<boolean>) {
      return { ...state, focused: action.payload };
    },
    setZoom(state, action: PayloadAction<number>) {
      return { ...state, zoom: action.payload };
    },
    setHeading(state, action: PayloadAction<number>) {
      if (state.coords) {
        return {
          ...state,
          coords: { ...state.coords, heading: action.payload },
        };
      }
    },
    setMapLoading(state, action: PayloadAction<boolean>) {
      return { ...state, mapLoading: action.payload };
    },
    setPackExists(state, action: PayloadAction<boolean>) {
      return { ...state, packExists: action.payload };
    },
  },
});
export const {
  setAllowed,
  setLocation,
  setFocused,
  setZoom,
  setHeading,
  setMapLoading,
  setPackExists,
} = locationSlice.actions;

export const setLocationAccess = (status: boolean) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setAllowed(status));
  };
};

/**
 * Currently, this throttling with Prev, is not necessary since we use expo-location which handles it already.
 * But the plan is to switch to mapbox location when bug is fixed, so I keep it here anyways.
 * The calculation is not too costly.
 *
 */
export const setUserLocation = (
  location: Location
): ThunkAction<void, RootState, unknown, UnknownAction> => {
  return async (dispatch, _getState) => {
    dispatch(
      setLocation({
        lat: location.coords.latitude,
        lon: location.coords.longitude,
        heading: location.coords.heading,
      })
    );
  };
};

export const setFocusedOnUser = (status: boolean) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setFocused(status));
    dispatch(setZoom(15));
  };
};

export const setMapHeading = (heading: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setHeading(heading));
  };
};

export default locationSlice.reducer;
