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
  persistedSettingsReducer,
  persistedChatWindowReducer,
  persistedThemeReducer,
  persistedChatInfoReducer,
} from "./persistConfig";
import { authApi } from "../apis/authApi";
import { chatApi } from "../apis/chatApi";
import loadingSliceReducer from "./slices/loadingSlice";

const store = configureStore({
  reducer: {
    theme: persistedThemeReducer,
    activeUser: persistedActiveUserReducer,
    profile: persistedProfileReducer,
    chats: persistedChatsReducer,
    settings: persistedSettingsReducer,
    chatWindow: persistedChatWindowReducer,
    [authApi.reducerPath]: authApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    chatInfo: persistedChatInfoReducer,
    loading: loadingSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(authApi.middleware)
      .concat(chatApi.middleware),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
