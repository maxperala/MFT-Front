import { ToastState, ToastType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";

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

export const createToast = (msg: string, type: ToastType) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setToast({ type, message: msg, active: true }));
  };
};

export default toastReducer.reducer;
