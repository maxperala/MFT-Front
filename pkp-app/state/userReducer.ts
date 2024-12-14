import {
  AccountState,
  User,
  NewUser,
  ErrorResponseData,
  Postcard,
  Coords,
} from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from "@/config";
import { AppDispatch } from "./store";
import { calculateDistance } from "@/utils/location/locationUtils";

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

export const discoverCards = (
  cards: Postcard[],
  location: Coords,
  token: string
) => {
  return async (dispatch: AppDispatch) => {
    for (const card of cards) {
      const distance = calculateDistance(
        {
          lat: card.location.lat,
          lon: card.location.lon,
          heading: card.degree,
        },
        location
      );
      console.log(distance);
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
        } catch (e) {
          if (e instanceof AxiosError) {
            console.log(e);
            throw new Error(e.response?.data.error[0]);
          }
          console.log(e);
        }
      }
    }
  };
};

export default userReducer.reducer;
