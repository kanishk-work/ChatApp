import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showProfile: false,
  showNotifications: false,
  showSettings: false,
  showNewGroup: false,
  showNewChat: false,
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setShowProfile: (state, { payload }) => {
      state.showProfile = payload;
    },
    setShowNotifications: (state, { payload }) => {
      state.showNotifications = payload;
    },
    setShowSettings: (state, { payload }) => {
      state.showSettings = payload;
    },
    setShowNewGroup: (state, { payload }) => {
      state.showNewGroup = payload;
    },
    setShowNewChat: (state, { payload }) => {
      state.showNewChat = payload;
    },
  },
});
export const { setShowProfile, setShowNotifications, setShowSettings, setShowNewGroup, setShowNewChat } = profileSlice.actions;
export default profileSlice.reducer;
