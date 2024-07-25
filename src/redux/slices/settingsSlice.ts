import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    showPrivacy: false,
    showNotification: false,
    showTheme: false,
    showShortcuts: false,
    showHelp: false,
    
    
};
const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setShowPrivacy: (state, { payload }) => {
        state.showPrivacy = payload;
    },
    setShowNotification: (state, { payload }) => {
        state.showNotification = payload;
    },
    setShowTheme: (state, { payload }) => {
        state.showTheme = payload;
    },
    setShowShortcuts: (state, { payload }) => {
        state.showShortcuts = payload;
    },
    setShowHelp: (state, { payload }) => {
        state.showHelp = payload;
    },
  },
});
export const { setShowNotification, setShowPrivacy, setShowTheme, setShowShortcuts, setShowHelp } = settingsSlice.actions;
export default settingsSlice.reducer;
