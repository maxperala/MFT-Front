import { AccountState, User, NewUser, ErrorResponseData } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from "@/config";
import { AppDispatch } from "./store";

const initialState: AccountState = {
  user: null,
};

const userReducer = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUser(_state, action: PayloadAction<User | null>) {
      return { user: action.payload };
    },
  },
});

export const { setUser } = userReducer.actions;

export const getUser = () => {
  return async (dispatch: AppDispatch) => {
    const loginData = await AsyncStorage.getItem("savedUser");
    if (!loginData) {
      return;
    }
    const savedUser: NewUser = JSON.parse(loginData);
    const resp = await axios.post(`${BACKEND_URL}/users/login`, savedUser);
    const data: User | ErrorResponseData = resp.data;
    if ("error" in data) {
      throw new Error(`Failed to login: ${data.error[0]}`);
    }
    dispatch(setUser(data));
  };
};

export const createUser = (user: NewUser) => {
  return async (dispatch: AppDispatch) => {
    let resp;
    console.log("DATA SENT", user);
    resp = await axios.post(`${BACKEND_URL}/users/register`, user);

    const data: User | ErrorResponseData = resp.data;
    if ("error" in data) {
      throw new Error(`Failed to register: ${data.error[0]}`);
    }

    await AsyncStorage.setItem(
      "savedUser",
      JSON.stringify({ username: data.username, secret_code: user.secret_code })
    );
    dispatch(setUser(data));
  };
};

export default userReducer.reducer;
