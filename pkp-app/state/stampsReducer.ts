import { Stamp, StampID, StampState } from "@/types";
import {
  createSlice,
  PayloadAction,
  ThunkAction,
  ThunkDispatch,
  UnknownAction,
} from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { createToast } from "./toastReducer";
import { debounce } from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState: StampState = {
  allStamps: [],
  activeStamp: null,
  activeStampVisible: false,
  viewedStamps: [],
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
    setViewedStamps(state, action: PayloadAction<StampID[]>) {
      return { ...state, viewedStamps: action.payload };
    },
  },
});

export const { setStamps, setActiveStamp, setVisibility, setViewedStamps } =
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
      const viewed = await AsyncStorage.getItem("viewedStamps");

      if (viewed) {
        dispatch(setViewedStamps(JSON.parse(viewed)));
      }
    } catch (e) {
      dispatch(
        createToast("An error occurred fetching stamps", "notification")
      );
      console.log(e);
    }
  };
};

export const clearActiveStamp = (
  id: StampID
): ThunkAction<void, RootState, unknown, UnknownAction> => {
  return async (dispatch, _getState) => {
    debouncedSetActiveStamp(dispatch, null, true, id);
  };
};

const debouncedSetActiveStamp = debounce(
  (
    dispatch: ThunkDispatch<RootState, unknown, UnknownAction>,
    stamp: Stamp | null,
    clearVisibility: boolean,
    id: StampID
  ) => {
    dispatch(setActiveStamp(stamp));
    if (clearVisibility) {
      dispatch(setVisibility(false));
      dispatch(setViewedStampsAndSave(id));
    }
  },
  1000,
  { leading: true, trailing: false }
);

export const setActiveStampDebounced = (
  stamp: Stamp | null,
  id: StampID
): ThunkAction<void, RootState, unknown, UnknownAction> => {
  return async (dispatch, _getState) => {
    debouncedSetActiveStamp(dispatch, stamp, false, id);
  };
};

export const setViewedStampsAndSave = (
  id: StampID
): ThunkAction<void, RootState, unknown, UnknownAction> => {
  return async (dispatch, getState) => {
    const viewed = getState().stamps.viewedStamps;
    if (!viewed.includes(id)) {
      const newViewed = viewed.concat(id);
      await AsyncStorage.setItem("viewedStamps", JSON.stringify(newViewed));
      dispatch(setViewedStamps(newViewed));
    }
  };
};

export default stampReducer.reducer;
