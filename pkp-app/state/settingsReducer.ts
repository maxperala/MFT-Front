import { SettingsState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SettingsState = {
  route: "",
};

const settingsReducer = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setRoute(state, action: PayloadAction<string>) {
      return { ...state, route: action.payload };
    },
  },
});

export const { setRoute } = settingsReducer.actions;

export default settingsReducer.reducer;
