import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showChatInfo: false,
};
const chatInfoSlice = createSlice({
  name: "chatInfo",
  initialState,
  reducers: {
    setShowChatInfo: (state, { payload }) => {
      state.showChatInfo = payload;
    },
  },
});
export const { setShowChatInfo } = chatInfoSlice.actions;
export default chatInfoSlice.reducer;
