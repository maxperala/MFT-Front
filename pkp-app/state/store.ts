import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./locationReducer";
import userReducer from "./userReducer";
import cardsReducer from "./cardsReducer";

const store = configureStore({
  reducer: {
    location: locationReducer,
    account: userReducer,
    cardData: cardsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
