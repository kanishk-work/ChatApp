import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import activeUserReducer from "./slices/activeUserSlice";
import chatsReducer from "./slices/chatsSlice";
import profileReducer from "./slices/profileSlice";
import searchReducer from "./slices/searchSlice";
import settingsReducer from "./slices/settingsSlice";
import viewReducer from "./slices/viewSlice";
import themeReducer from "./slices/themeSlice";
const activeUserPersistConfig = {
  key: "activeUser",
  storage,
};
const chatsPersistConfig = {
  key: "chats",
  storage,
};
const profilePersistConfig = {
  key: "profile",
  storage,
};
const searchPersistConfig = {
  key: "search",
  storage,
};
const settingsPersistConfig = {
  key: "settings",
  storage,
};
const viewPersistConfig = {
  key: "view",
  storage,
};
const themePersistConfig = {
  key: "theme",
  storage,
};

export const persistedActiveUserReducer = persistReducer(
  activeUserPersistConfig,
  activeUserReducer
);
export const persistedChatsReducer = persistReducer(
  chatsPersistConfig,
  chatsReducer
);
export const persistedProfileReducer = persistReducer(
  profilePersistConfig,
  profileReducer
);
export const persistedSearchReducer = persistReducer(
  searchPersistConfig,
  searchReducer
);
export const persistedSettingsReducer = persistReducer(
  settingsPersistConfig,
  settingsReducer
);
export const persistedViewReducer = persistReducer(
  viewPersistConfig,
  viewReducer
);
export const persistedThemeReducer = persistReducer(
  themePersistConfig,
  themeReducer
);
