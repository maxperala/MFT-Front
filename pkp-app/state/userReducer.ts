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

export const getUser = () => async (dispatch: AppDispatch) => {
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

export const createUser = (user: NewUser) => async (dispatch: AppDispatch) => {
  const resp = await axios.post(`${BACKEND_URL}/users/register`, user);
  const data: User | ErrorResponseData = resp.data;
  if ("error" in data) {
    throw new Error(`Failed to register: ${data.error[0]}`);
  }
  dispatch(setUser(data));
  await AsyncStorage.setItem("savedUser", data.toString());
};

export default userReducer.reducer;
