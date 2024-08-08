import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import activeUserReducer from "./slices/activeUserSlice";
import chatsReducer from "./slices/chatsSlice";
import profileReducer from "./slices/profileSlice";
import searchReducer from "./slices/searchSlice";
import settingsReducer from "./slices/settingsSlice";
import chatWindowReducer from "./slices/chatWindowSlice";
import themeReducer from "./slices/themeSlice";
import chatInfoReducer from "./slices/chatInfoSlice";

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
const chatWindowPersistConfig = {
  key: "chatWindow",
  storage,
};
const themePersistConfig = {
  key: "theme",
  storage,
};
const chatInfoConfig = {
  key: "chatInfo",
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
export const persistedChatWindowReducer = persistReducer(
  chatWindowPersistConfig,
  chatWindowReducer
);
export const persistedThemeReducer = persistReducer(
  themePersistConfig,
  themeReducer
);
export const persistedChatInfoReducer = persistReducer(
  chatInfoConfig,
  chatInfoReducer
);
