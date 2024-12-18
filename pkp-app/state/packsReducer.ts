import { Pack, PackState } from "@/types";
import {
  createSlice,
  PayloadAction,
  ThunkAction,
  UnknownAction,
} from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { setUnlockedPacks } from "./userReducer";
import { getCards } from "./cardsReducer";

const initialState: PackState = {
  packs: [],
};

const packsReducer = createSlice({
  name: "packs",
  initialState,
  reducers: {
    setPacks(_state, action: PayloadAction<Pack[]>) {
      return { packs: action.payload };
    },
  },
});

export const { setPacks } = packsReducer.actions;

export const getAllPacks = (): ThunkAction<
  void,
  RootState,
  unknown,
  UnknownAction
> => {
  return async (dispatch, getState) => {
    const state = getState();
    const token = state.account.user?.token;
    try {
      const res = await axios.get(`${BACKEND_URL}/packs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const packs: Pack[] = res.data;
      if (!packs) return;
      dispatch(setPacks(packs));
    } catch (e) {
      // I need to implement error handling later for the entire app..
      console.log(e);
    }
  };
};

export const unlockPack = (
  id: string
): ThunkAction<void, RootState, unknown, UnknownAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    const token = state.account.user?.token;
    try {
      const res = await axios.post(
        `${BACKEND_URL}/packs/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const unlocked: string[] = res.data?.packs;
      if (!unlocked) return;
      dispatch(setUnlockedPacks(unlocked));
      // I NEED TO DISPATCH THE ACTION TO GET CARDS AGAIN.. NEED TO FIX THE TYPINGS FIRST
    } catch (e) {
      console.log(e);
    }
  };
};

export default packsReducer.reducer;
