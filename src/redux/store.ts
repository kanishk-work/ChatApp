import { configureStore } from "@reduxjs/toolkit";
import activeUserSlice from "./slices/activeUserSlice";
import chatsReducer from "./slices/chatsSlice";
import profileReducer from "./slices/profileSlice";
import searchReducer from "./slices/searchSlice";
import settingsReducer from "./slices/settingsSlice";
import viewReducer from "./slices/viewSlice";

const store = configureStore({
  reducer: {
    activeUser: activeUserSlice,
    profile: profileReducer,
    search: searchReducer,
    chats: chatsReducer,
    settings: settingsReducer,
    view: viewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
