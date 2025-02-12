import { introSavedObject, SettingsRoute, SettingsState } from "@/types";
import {
  createSlice,
  PayloadAction,
  ThunkAction,
  UnknownAction,
} from "@reduxjs/toolkit";
import i18n from "@/utils/i18n";
import { RootState } from "./store";
import { getSavedLanguage, setLanguage } from "@/utils/localization";
import * as Clipboard from "expo-clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Router } from "expo-router";
import { createToast } from "./toastReducer";

const initialState: SettingsState = {
  route: "",
  language: i18n.language,
  introSeen: true,
  testMode: false,
};

const settingsReducer = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setRoute(state, action: PayloadAction<SettingsRoute>) {
      return { ...state, route: action.payload };
    },
    setStateLanguage(state, action: PayloadAction<string>) {
      return { ...state, language: action.payload };
    },
    setIntroSeen(state, action: PayloadAction<boolean>) {
      return { ...state, introSeen: action.payload };
    },
    setTestMode(state, action: PayloadAction<boolean>) {
      return { ...state, testMode: action.payload };
    },
  },
});

export const { setRoute, setStateLanguage, setIntroSeen, setTestMode } =
  settingsReducer.actions;

export const changeLanguage = (
  lng: string
): ThunkAction<void, RootState, unknown, UnknownAction> => {
  return async (dispatch, getState) => {
    if (lng != getState().settings.language) {
      dispatch(setStateLanguage(lng));
      await setLanguage(lng, i18n);
    }
  };
};

export const initSavedLanguage = (): ThunkAction<
  void,
  RootState,
  unknown,
  UnknownAction
> => {
  return async (dispatch, getState) => {
    const savedLanguage = await getSavedLanguage();
    if (savedLanguage && savedLanguage != getState().settings.language) {
      dispatch(changeLanguage(savedLanguage));
    }
  };
};

export const setSettingsRoute = (
  route: SettingsRoute,
  router: Router
): ThunkAction<void, RootState, unknown, UnknownAction> => {
  return async (dispatch, __getState) => {
    if (route === "token") {
      const savedUser = await AsyncStorage.getItem("savedUser");
      if (savedUser) {
        // I know this could be undefined, but it is not actually ever. I don't wanna nest too many if statements or run unecessary actions.
        const token = JSON.parse(savedUser).secret_code;

        await Clipboard.setStringAsync(token);
        return;
      }
    }
    if (route === "info") {
      router.push("/info_page");
      return;
    }
    dispatch(setRoute(route));
  };
};

export const checkIntroSeen = (): ThunkAction<
  void,
  RootState,
  unknown,
  UnknownAction
> => {
  return async (dispatch) => {
    try {
      const introSeen = await AsyncStorage.getItem("introSeen");
      if (!introSeen) {
        dispatch(setIntroSeen(false));
        return;
      }
      const data: introSavedObject = JSON.parse(introSeen);
      if (data.seen) {
        return;
      }
      dispatch(setIntroSeen(false));
    } catch (e) {
      console.log(e);
      dispatch(createToast("An unknown error occurred", "notification"));
    }
  };
};

export const setIntroToSeen = (): ThunkAction<
  void,
  RootState,
  unknown,
  UnknownAction
> => {
  return async (dispatch) => {
    try {
      dispatch(setIntroSeen(true));
      await AsyncStorage.setItem("introSeen", JSON.stringify({ seen: true }));
    } catch (e) {
      console.log(e);
      dispatch(createToast("An uknown error occurred", "notification"));
    }
  };
};

export default settingsReducer.reducer;
