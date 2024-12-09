import { AppDispatch } from "@/state/store";
import { ErrorResponseData, Postcard, PostcardsState } from "@/types";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export const getCards = (token: string) => {
  return async (dispatch: AppDispatch) => {
    const resp = await axios.get(`${BACKEND_URL}/postcards`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data: Postcard[] | ErrorResponseData = resp.data;
    if ("error" in data) {
      throw new Error(`Failed fetching postcards, ${data.error[0]}`);
    }
    console.log(data);
    dispatch(setCards(data));
  };
};

export const setActiveCard = (card: Postcard | null) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setActive(card));
  };
};

export default cardsReducer.reducer;
