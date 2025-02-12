/**
 * Manages navigation state and district information
 */
import { Coords, NavigationState, PostCodeInfo } from "@/types";
import {
  Action,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { RootState } from "./store";
import { locToArea } from "@/utils/location/locationHelpers";

const initialState: NavigationState = {
  currentDistrict: null,
};

const navigationReducer = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setDistrict(state, action: PayloadAction<PostCodeInfo | null>) {
      return { ...state, currentDistrict: action.payload };
    },
  },
});

export const { setDistrict } = navigationReducer.actions;

/**
 * Updates the header district based on current coordinates
 */
export const setHeaderDistrict = (
  c: Coords
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch, getState) => {
    const current = getState().navigation.currentDistrict;
    const area = locToArea(c);
    if (area != current) {
      dispatch(setDistrict(area));
    }
  };
};

export default navigationReducer.reducer;
