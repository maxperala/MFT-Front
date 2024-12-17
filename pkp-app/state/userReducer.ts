import {
  AccountState,
  User,
  NewUser,
  ErrorResponseData,
  Postcard,
  Coords,
} from "@/types";
import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from "@/config";
import { AppDispatch, RootState } from "./store";
import { calculateDistance } from "@/utils/location/locationUtils";
import { setActive, setToast } from "./toastReducer";
import { setPrev } from "./locationReducer";

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
      console.log("STATE", state);
      if (state.user) {
        return { ...state, user: { ...state.user, unlocked: action.payload } };
      }
      return state;
    },
  },
});

export const { setUser, setLoading, setUnlocked } = userReducer.actions;

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
    dispatch(setLoading(true));
    let resp;
    console.log("DATA SENT", user);
    resp = await axios.post(`${BACKEND_URL}/users/register`, user);

    const data: User | ErrorResponseData = resp.data;
    if ("error" in data) {
      dispatch(setLoading(false));
      throw new Error(`Failed to register: ${data.error[0]}`);
    }

    await AsyncStorage.setItem(
      "savedUser",
      JSON.stringify({ username: data.username, secret_code: user.secret_code })
    );
    dispatch(setUser(data));
    dispatch(setLoading(false));
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
    const prev = state.location.prev;
    const discovered = state.account.user?.unlocked;
    const token = state.account.user?.token;
    if (!location || !prev || !discovered || !token) return;
    const calcDis = calculateDistance(location, prev);
    if (calcDis < 5) {
      setPrev(location);
      return;
    }
    const cards = state.cardData.cards?.filter(
      (card) => !discovered?.includes(card.id)
    );
    if (!cards) {
      dispatch(setPrev(location));
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

      if (distance < 20) {
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
          dispatch(
            setToast({
              type: "discover",
              message: "New location discovered",
              active: true,
            })
          );
        } catch (e) {
          if (e instanceof AxiosError) {
            console.log(e);
            throw new Error(e.response?.data.error[0]);
          }
          console.log(e);
        }
      }
    }
    dispatch(setPrev(location));
  };
};

export default userReducer.reducer;
