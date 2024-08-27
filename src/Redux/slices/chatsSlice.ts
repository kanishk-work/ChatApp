import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { chatApi } from "../../apis/chatApi";
import { Chat, ConversationsType, ChatMessage } from "../../Types/chats";

// Update the ChatMessage interface to align with API response
export interface ChatMessagePayload {
  receiver_id: number | undefined;
  message: string;
  chat_room_id: number | undefined;
  files_list: string[] | [];
}

export interface ChatsState {
  chats: Chat[];
  conversations: ChatMessage[];
  activeChatId: number | null;
  notifications: string[];
  currentUserId: number;
}

const initialState: ChatsState = {
  chats: [],
  conversations: [],
  activeChatId: null,
  notifications: [],
  currentUserId: 1,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setActiveChatId: (state, action: PayloadAction<number | null>) => {
      state.activeChatId = action.payload;
    },
    setNotifications: (state, action: PayloadAction<string[]>) => {
      state.notifications = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addMatcher(
    //   chatApi.endpoints.getChats.matchFulfilled,
    //   (state, action: PayloadAction<{ list: Chat[] }>) => {
    //     state.chats = action.payload.list;
    //   }
    // );
    // builder.addMatcher(
    //   chatApi.endpoints.getConversations.matchFulfilled,
    //   (state, action: PayloadAction<ConversationsType>) => {
    //     state.conversations = action.payload.list;
    //   }
    // );
  },
});

export const { setActiveChatId, setNotifications } = chatsSlice.actions;
export default chatsSlice.reducer;
