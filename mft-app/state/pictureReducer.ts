/**
 * Manages the state of the currently displayed full-screen picture URL
 */
import { PictureUrlState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PictureUrlState = {
  url: null,
};

const pictureReducer = createSlice({
  name: "picture",
  initialState,
  reducers: {
    setPicture(_state, action: PayloadAction<string | null>) {
      return { url: action.payload };
    },
  },
});

export const { setPicture } = pictureReducer.actions;

export default pictureReducer.reducer;
