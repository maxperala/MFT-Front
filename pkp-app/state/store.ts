import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./locationReducer";
import userReducer from "./userReducer";
import cardsReducer from "./cardsReducer";
import toastReducer from "./toastReducer";
import packsReducer from "./packsReducer";
import pictureReducer from "./pictureReducer";
import navigationReducer from "./navigationReducer";

const store = configureStore({
  reducer: {
    location: locationReducer,
    account: userReducer,
    cardData: cardsReducer,
    toast: toastReducer,
    packs: packsReducer,
    picture: pictureReducer,
    navigation: navigationReducer,
    
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
