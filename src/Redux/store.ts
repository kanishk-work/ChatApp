import { configureStore } from "@reduxjs/toolkit";
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
  persistedChatWindowReducer,
  persistedThemeReducer,
  persistedChatInfoReducer,
} from "./persistConfig";
import { authApi } from "../apis/authApi"; // Adjust the path as needed

const store = configureStore({
  reducer: {
    theme: persistedThemeReducer,
    activeUser: persistedActiveUserReducer,
    profile: persistedProfileReducer,
    search: persistedSearchReducer,
    chats: persistedChatsReducer,
    settings: persistedSettingsReducer,
    chatWindow: persistedChatWindowReducer,
    [authApi.reducerPath]: authApi.reducer,
    chatInfo: persistedChatInfoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
