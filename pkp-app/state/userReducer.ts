import { AccountState, User, NewUser, ErrorResponseData } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from "@/config";
import { AppDispatch } from "./store";

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
  },
});

export const { setUser, setLoading } = userReducer.actions;

export const getUser = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    const loginData = await AsyncStorage.getItem("savedUser");
    if (!loginData) {
      dispatch(setLoading(false));
      return;
    }
    const savedUser: NewUser = JSON.parse(loginData);
    const resp = await axios.post(`${BACKEND_URL}/users/login`, savedUser);
    const data: User | ErrorResponseData = resp.data;
    if ("error" in data) {
      dispatch(setLoading(false));
      throw new Error(`Failed to login: ${data.error[0]}`);
    }
    dispatch(setUser(data));
    dispatch(setLoading(false));
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

export default userReducer.reducer;
