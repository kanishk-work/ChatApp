import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ViewState = "chatList" | "chatWindow";

const initialState = {
  view: "chatList",
};

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<ViewState>) => {
      state.view = action.payload;
    },
  },
});

export const { setView } = viewSlice.actions;
export default viewSlice.reducer;
