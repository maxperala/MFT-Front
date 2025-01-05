// There is a expo package with a type of the same name, so WATCH OUT if IDE tries to auto-import that
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

export const setHeaderDistrict = (
  c: Coords
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    const area = locToArea(c);
    dispatch(setDistrict(area));
  };
};

export default navigationReducer.reducer;
