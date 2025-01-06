import {
  createSlice,
  PayloadAction,
  ThunkAction,
  UnknownAction,
} from "@reduxjs/toolkit";
import { Coords, UserLocation } from "@/types";
import { AppDispatch, RootState } from "./store";
import { Location } from "@maplibre/maplibre-react-native";
import { isUserInArea } from "@/utils/location/locationHelpers";
import { setHeaderDistrict } from "./navigationReducer";

const initialState: UserLocation = {
  coords: null,
  allowed: false,
  allowedLoading: true,
  focused: false,
  zoom: 10,
  mapLoading: true,
  packExists: true,
  showMap: true,
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
    setShowMap(state, action: PayloadAction<boolean>) {
      return { ...state, showMap: action.payload };
    },
    setAllowedLoading(state, action: PayloadAction<boolean>) {
      return {...state, allowedLoading: action.payload}
    }
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
  setShowMap,
  setAllowedLoading
} = locationSlice.actions;

export const setLocationAccess = (status: boolean) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setAllowed(status));
  };
};

export const setUserLocation = (
  location: Location
): ThunkAction<void, RootState, unknown, UnknownAction> => {
  return async (dispatch, getState) => {
    console.log("RAN LOCATION UPDATE", location);
    const mapShown = getState().location.showMap;
    // Setting heading here makes no difference, since it has no impact. The heading is coming from a different source (the map) and loc from expo-location
    const c: Coords = {
      lat: location.coords.latitude,
      lon: location.coords.longitude,
      heading: location.coords.heading,
    };
    dispatch(setLocation(c));
    const inArea = isUserInArea({
      lat: location.coords.latitude,
      lon: location.coords.longitude,
    });
    if (inArea && !mapShown) {
      dispatch(setShowMap(true));
    } else if (!inArea && mapShown) {
      console.log("DISABLING MAP");
      dispatch(setShowMap(false));
    }
    dispatch(setHeaderDistrict(c));
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
