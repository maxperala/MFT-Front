import { AppDispatch, RootState } from "@/state/store";
import { Postcard, PostcardsState } from "@/types";
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "@/config";
import {
  createSlice,
  PayloadAction,
  ThunkAction,
  UnknownAction,
} from "@reduxjs/toolkit";
import { createToast } from "./toastReducer";

const initialState: PostcardsState = {
  cards: null,
  active: null,
};

const cardsReducer = createSlice({
  name: "cardData",
  initialState,
  reducers: {
    setCards: (_state, action: PayloadAction<Postcard[] | null>) => {
      return { cards: action.payload, active: null };
    },
    setActive: (state, action: PayloadAction<Postcard | null>) => {
      return { ...state, active: action.payload };
    },
  },
});

export const { setCards, setActive } = cardsReducer.actions;

export const getCards = (
  token: string
): ThunkAction<void, RootState, unknown, UnknownAction> => {
  return async (dispatch) => {
    try {
      const resp = await axios.get(`${BACKEND_URL}/postcards`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: Postcard[] = resp.data;
      dispatch(setCards(data));
    } catch (e) {
      if (e instanceof AxiosError && "error" in e.response?.data) {
        dispatch(createToast("Could not fetch postcards", "notification"));
        throw new Error(
          `Failed fetching postcards, ${e.response?.data.error[0]}`
        );
      }
    }
  };
};
// This is currently useless, and typed wrong
export const setActiveCard = (card: Postcard | null) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setActive(card));
  };
};

export default cardsReducer.reducer;
