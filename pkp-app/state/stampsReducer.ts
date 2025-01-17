import { Stamp, StampState } from "@/types";
import {
  createSlice,
  PayloadAction,
  ThunkAction,
  ThunkDispatch,
  UnknownAction,
} from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { createToast } from "./toastReducer";
import { debounce } from "lodash";

const initialState: StampState = {
  allStamps: [],
  activeStamp: null,
  activeStampVisible: false,
};

const stampReducer = createSlice({
  name: "stamps",
  initialState,
  reducers: {
    setStamps(state, action: PayloadAction<Stamp[]>) {
      return { ...state, allStamps: action.payload };
    },
    setActiveStamp(state, action: PayloadAction<Stamp | null>) {
      return { ...state, activeStamp: action.payload };
    },
    setVisibility(state, action: PayloadAction<boolean>) {
      return { ...state, activeStampVisible: action.payload };
    },
  },
});

export const { setStamps, setActiveStamp, setVisibility } =
  stampReducer.actions;

export const getAllStamps = (): ThunkAction<
  void,
  RootState,
  unknown,
  UnknownAction
> => {
  return async (dispatch, getState) => {
    try {
      const token = getState().account.user?.token;
      if (!token) {
        return;
      }
      const resp = await axios.get(`${BACKEND_URL}/stamps`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const stamps: Stamp[] = resp.data;
      if (stamps) {
        dispatch(setStamps(stamps));
      }
    } catch (e) {
      dispatch(
        createToast("An error occurred fetching stamps", "notification")
      );
      console.log(e);
    }
  };
};

export const clearActiveStamp = (): ThunkAction<
  void,
  RootState,
  unknown,
  UnknownAction
> => {
  return async (dispatch, _getState) => {
    debouncedSetActiveStamp(dispatch, null, true);
  };
};

const debouncedSetActiveStamp = debounce(
  (
    dispatch: ThunkDispatch<RootState, unknown, UnknownAction>,
    stamp: Stamp | null,
    clearVisibility: boolean
  ) => {
    dispatch(setActiveStamp(stamp));
    if (clearVisibility) {
      dispatch(setVisibility(false));
    }
  },
  1000,
  { leading: true, trailing: false }
);

export const setActiveStampDebounced = (
  stamp: Stamp | null
): ThunkAction<void, RootState, unknown, UnknownAction> => {
  return async (dispatch, _getState) => {
    debouncedSetActiveStamp(dispatch, stamp, false);
  };
};

export default stampReducer.reducer;
