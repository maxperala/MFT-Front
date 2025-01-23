import {
  AccountState,
  User,
  NewUser,
  Level,
  UnlockedResponse,
  StampID,
} from "@/types";
import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkAction,
  UnknownAction,
} from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL, DISCOVER_RANGE } from "@/config";
import { AppDispatch, RootState } from "./store";
import { calculateDistance } from "@/utils/location/locationHelpers";
import { createToast, setToast } from "./toastReducer";
import i18n from "@/utils/i18n";
import { getCards } from "./cardsReducer";
import {
  setActiveStamp,
  setActiveStampDebounced,
  setViewedStamps,
} from "./stampsReducer";

const initialState: AccountState = {
  user: null,
  loading: true,
};

const userReducer = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      return { ...state, user: action.payload };
    },
    setLoading(state, action: PayloadAction<boolean>) {
      return { ...state, loading: action.payload };
    },
    setUnlocked(state, action: PayloadAction<string[]>) {
      if (state.user) {
        return { ...state, user: { ...state.user, unlocked: action.payload } };
      }
      return state;
    },
    setUnlockedPacks(state, action: PayloadAction<string[]>) {
      if (state.user) {
        return { ...state, user: { ...state.user, packs: action.payload } };
      }
    },
    setLevel(state, action: PayloadAction<Level>) {
      if (state.user) {
        return { ...state, user: { ...state.user, lvl: action.payload } };
      }
    },
    setUnlockedStamps(state, action: PayloadAction<StampID[]>) {
      if (state.user) {
        return { ...state, user: { ...state.user, stamps: action.payload } };
      }
    },
  },
});

export const {
  setUser,
  setLoading,
  setUnlocked,
  setUnlockedPacks,
  setLevel,
  setUnlockedStamps,
} = userReducer.actions;

export const getUser = (): ThunkAction<
  void,
  RootState,
  unknown,
  UnknownAction
> => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const loginData = await AsyncStorage.getItem("savedUser");
    if (!loginData) {
      dispatch(setLoading(false));
      return;
    }
    const savedUser: NewUser = JSON.parse(loginData);
    dispatch(loginUser(savedUser));
  };
};

export const loginUser = (
  loginData: NewUser
): ThunkAction<void, RootState, unknown, UnknownAction> => {
  return async (dispatch, _getState) => {
    try {
      const resp = await axios.post(`${BACKEND_URL}/users/login`, loginData);
      const data: User = resp.data;
      dispatch(setUser(data));
      await AsyncStorage.setItem(
        "savedUser",
        JSON.stringify({
          username: data.username,
          secret_code: loginData.secret_code,
        })
      );
      dispatch(setLoading(false));
    } catch (e) {
      if (e instanceof AxiosError && "errors" in e.response?.data) {
        dispatch(createToast(`${e.response?.data.errors[0]}`, "notification"));
      } else {
        dispatch(createToast("Unknown error logging in", "notification"));
      }
      console.log(e);
      dispatch(setLoading(false));
    }
  };
};

export const createUser = (
  user: NewUser
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      let resp;
      resp = await axios.post(`${BACKEND_URL}/users/register`, user);

      const data: User = resp.data;
      if ("error" in data) {
      }

      await AsyncStorage.setItem(
        "savedUser",
        JSON.stringify({
          username: data.username,
          secret_code: user.secret_code,
        })
      );
      dispatch(setUser(data));

      dispatch(setLoading(false));
      /* This is a workaround for an android issue I don't fully understand. On first launch (when registering) the
      map does not ever call its ready function. So we just reload the app after registering. iOS does not have this issue,
      and I don't currently understand why this happens on android */
      /*

      if (Platform.OS === "android") {
        RNRestart.restart();
      }
    */
      // We wait 10 seconds before revealing the registering congratulation stamp...
      if (data.stamps.length === 1) {
        setTimeout(() => {
          const fullStampData = getState().stamps.allStamps.find(
            (s) => s.id === data.stamps[0]
          );
          if (fullStampData) {
            dispatch(setActiveStamp(fullStampData));
          }
        }, 10000);
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response);
      }
      dispatch(setLoading(false));
      if (
        e instanceof AxiosError &&
        "errors" in e.response?.data &&
        e.response?.data.errors.length > 0
      ) {
        dispatch(
          createToast(e.response?.data.errors.join(", "), "notification")
        );
      } else {
        dispatch(createToast("An unknown error occurred", "notification"));
        console.log(e);
        throw new Error(`Failed to register, an unknown error occurred.`);
      }
    }
  };
};

export const discoverCards = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    const state = getState();
    const location = state.location.coords;
    const discovered = state.account.user?.unlocked;
    const token = state.account.user?.token;
    if (!location || !discovered || !token) return;
    const cards = state.cardData.cards?.filter(
      (card) => !discovered?.includes(card.id)
    );
    if (!cards) {
      return;
    }

    for (const card of cards) {
      const distance = calculateDistance(
        {
          lat: card.location.lat,
          lon: card.location.lon,
          heading: card.degree,
        },
        location
      );

      if (distance < DISCOVER_RANGE) {
        try {
          const resp = await axios.post(
            `${BACKEND_URL}/postcards/unlocked/${card.id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data: UnlockedResponse = resp.data;
          dispatch(setUnlocked(data.discovered));
          dispatch(
            createToast(
              i18n.language === "fi" ? card.title_fi : card.title_en,
              "discover"
            )
          );
          if (data.newStamps.length != state.account.user?.stamps.length) {
            const newStamp = data.newStamps.find(
              (s) => !state.account.user?.stamps.includes(s)
            );
            dispatch(setUnlockedStamps(data.newStamps));
            const fullStampData = state.stamps.allStamps.find(
              (s) => s.id === newStamp
            );
            if (fullStampData) {
              setTimeout(() => {
                dispatch(
                  setActiveStampDebounced(fullStampData, fullStampData.id)
                );
              }, 3000);
            }
          }
          // I should rename one of the "depths" of lvl, confusing like this
          if (
            state.account.user &&
            data.newLevel.lvl != state.account.user.lvl.lvl
          ) {
            dispatch(setLevel(data.newLevel));
            dispatch(getCards(state.account.user.token));
          }
        } catch (e) {
          if (e instanceof AxiosError) {
            createToast("Failed to discover location", "notification");
            throw new Error(e.response?.data.error[0]);
          }
          console.log(e);
        }
      }
    }
  };
};

export const loginUserFromPage = (
  data: NewUser
): ThunkAction<void, RootState, unknown, UnknownAction> => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(loginUser(data));
  };
};

export default userReducer.reducer;
