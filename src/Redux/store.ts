import { configureStore } from "@reduxjs/toolkit";
import activeUserReducer from "./slices/activeUserSlice";
import chatsReducer from "./slices/chatsSlice";
import profileReducer from "./slices/profileSlice";
import searchReducer from "./slices/searchSlice";
import settingsReducer from "./slices/settingsSlice";
import viewReducer from "./slices/viewSlice";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import {
  persistedActiveUserReducer,
  persistedChatsReducer,
  persistedProfileReducer,
  persistedSearchReducer,
  persistedSettingsReducer,
  persistedViewReducer,
} from "./persistConfig";

const store = configureStore({
  reducer: {
    activeUser: persistedActiveUserReducer,
    profile: persistedProfileReducer,
    search: persistedSearchReducer,
    chats: persistedChatsReducer,
    settings: persistedSettingsReducer,
    view: persistedViewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
