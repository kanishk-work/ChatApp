import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showProfile: false,
  showNotifications: false,
  showSettings: false,
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
  },
});
export const { setShowProfile, setShowNotifications, setShowSettings } = profileSlice.actions;
export default profileSlice.reducer;
