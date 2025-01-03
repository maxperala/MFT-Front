import { ToastState, ToastType } from "@/types";
import {
  createSlice,
  PayloadAction,
  ThunkAction,
  UnknownAction,
} from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState: ToastState = {
  type: null,
  message: null,
  active: false,
};

const toastReducer = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToast(_state, action: PayloadAction<ToastState>) {
      return action.payload;
    },
    setActive(state, action: PayloadAction<boolean>) {
      return { ...state, active: action.payload };
    },
  },
});

export const { setToast, setActive } = toastReducer.actions;

export const createToast = (
  msg: string,
  type: ToastType
): ThunkAction<void, RootState, unknown, UnknownAction> => {
  return async (dispatch) => {
    dispatch(setToast({ type, message: msg, active: true }));
  };
};

export default toastReducer.reducer;
