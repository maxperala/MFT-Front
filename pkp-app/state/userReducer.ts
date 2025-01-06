import { AccountState, User, NewUser, ErrorResponseData } from "@/types";
import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL, DISCOVER_RANGE } from "@/config";
import { AppDispatch, RootState } from "./store";
import { calculateDistance } from "@/utils/location/locationHelpers";
import { createToast, setActive } from "./toastReducer";
import i18n from "@/utils/i18n";

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
  },
});

export const { setUser, setLoading, setUnlocked, setUnlockedPacks } =
  userReducer.actions;

export const getUser = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    const loginData = await AsyncStorage.getItem("savedUser");
    if (!loginData) {
      dispatch(setLoading(false));
      return;
    }
    const savedUser: NewUser = JSON.parse(loginData);
    try {
      const resp = await axios.post(`${BACKEND_URL}/users/login`, savedUser);
      const data: User = resp.data;
      dispatch(setUser(data));

      dispatch(setLoading(false));
    } catch (e) {
      if (e instanceof AxiosError) {
        dispatch(setLoading(false));
        throw new Error(e.response?.data.error);
      }
      console.log(e);
      dispatch(setLoading(false));
    }
  };
};

export const createUser = (user: NewUser) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      let resp;
      resp = await axios.post(`${BACKEND_URL}/users/register`, user);
  
      const data: User = resp.data;
      if ("error" in data) {

      }
  
      await AsyncStorage.setItem(
        "savedUser",
        JSON.stringify({ username: data.username, secret_code: user.secret_code })
      );
      dispatch(setUser(data));
  
      dispatch(setLoading(false));
    } catch (e) {
      dispatch(setLoading(false));
      dispatch(createToast("An unknown error occurred", "notification"));
      console.log(e);
      throw new Error(`Failed to register, an unknown error occurred.`);

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
          dispatch(setUnlocked(resp.data.unlocked));
          dispatch(setActive(false));
          dispatch(createToast((i18n.language === "fi" ? card.title_fi : card.title_en), "discover"));
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

export default userReducer.reducer;
