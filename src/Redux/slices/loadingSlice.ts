import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoadingState {
  isChatsLoading: boolean;
  isConversationsLoading: boolean;
}

const initialState: LoadingState = {
  isChatsLoading: false,
  isConversationsLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setChatsLoading: (state, action: PayloadAction<boolean>) => {
      state.isChatsLoading = action.payload;
    },
    setConversationsLoading: (state, action: PayloadAction<boolean>) => {
      state.isConversationsLoading = action.payload;
    },
  },
});

export const { setChatsLoading, setConversationsLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
