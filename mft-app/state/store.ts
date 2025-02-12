import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./locationReducer";
import userReducer from "./userReducer";
import cardsReducer from "./cardsReducer";
import toastReducer from "./toastReducer";
import packsReducer from "./packsReducer";
import pictureReducer from "./pictureReducer";
import navigationReducer from "./navigationReducer";
import stampReducer from "./stampsReducer";
import settingsReducer from "./settingsReducer";

const store = configureStore({
  reducer: {
    location: locationReducer,
    account: userReducer,
    cardData: cardsReducer,
    toast: toastReducer,
    packs: packsReducer,
    stamps: stampReducer,
    picture: pictureReducer,
    navigation: navigationReducer,
    settings: settingsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
