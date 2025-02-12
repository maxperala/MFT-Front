import { Pack, PackState } from "@/types";
import {
  createSlice,
  PayloadAction,
  ThunkAction,
  UnknownAction,
} from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "@/config";
import { setUnlockedPacks } from "./userReducer";
import { createToast } from "./toastReducer";
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
      dispatch(createToast("Fetching packs failed", "notification"));
      if (e instanceof AxiosError && "error" in e.response?.data) {
        throw new Error(`Failed to fetch packs, ${e.response?.data.error[0]}`);
      }
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

      if (token) {
        dispatch(getCards(token));
      }
    } catch (e) {
      dispatch(createToast("Unlocking pack failed", "notification"));
      console.log(e);
    }
  };
};

export default packsReducer.reducer;
