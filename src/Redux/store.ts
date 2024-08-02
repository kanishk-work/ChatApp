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
  persistedThemeReducer,
  persistedViewReducer,
} from "./persistConfig";

const store = configureStore({
  reducer: {
    theme: persistedThemeReducer,
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
