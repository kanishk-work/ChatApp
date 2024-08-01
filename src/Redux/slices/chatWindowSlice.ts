import { createSlice} from "@reduxjs/toolkit";

const initialState = {
  chatWindow: false,
};

const chatWindowSlice = createSlice({
  name: "chatWindow",
  initialState,
  reducers: {
    setChatWindow: (state, { payload }) => {
      state.chatWindow = payload;
    },
  },
});

export const { setChatWindow } = chatWindowSlice.actions;
export default chatWindowSlice.reducer;
