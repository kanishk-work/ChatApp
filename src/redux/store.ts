import { configureStore } from "@reduxjs/toolkit";
import activeUserSlice from "./slices/activeUserSlice";
import chatsSlice from "./slices/chatsSlice";
import profileSlice from "./slices/profileSlice";
import searchSlice from "./slices/searchSlice";
import settingsSlice from "./slices/settingsSlice";
const store = configureStore({
  reducer: {
    activeUser: activeUserSlice,
    profile: profileSlice,
    search: searchSlice,
    chats: chatsSlice,
    settings:settingsSlice,
  },
});
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch