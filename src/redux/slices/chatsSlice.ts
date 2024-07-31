import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../../types/message";

export interface ChatsState {
  chats: { [key: number]: Message[] };
  activeChat: number | null;
  notifications: string[];
}

const initialState: ChatsState = {
  chats: {
    1: [
      {
        id: 1,
        chatId: 1,
        text: "Hello, how are you?",
        sender: "user",
        timestamp: new Date(),
      },
      {
        id: 2,
        chatId: 1,
        text: "I'm good, thanks! How about you?",
        sender: "other",
        timestamp: new Date(),
      },
    ],
    2: [
      {
        id: 3,
        chatId: 2,
        text: "Hi there! Ready for the meeting?",
        sender: "other",
        timestamp: new Date(),
      },
      {
        id: 4,
        chatId: 2,
        text: "Yes, I am. See you soon.",
        sender: "user",
        timestamp: new Date(),
      },
    ],
  },
  activeChat: 1,

  notifications: [],
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setActiveChat: (state, action: PayloadAction<number | null>) => {
      state.activeChat = action.payload;
    },
    addMessage: (
      state,
      action: PayloadAction<{ chatId: number; message: Omit<Message, "id"> }>
    ) => {
      const { chatId, message } = action.payload;
      if (!state.chats[chatId]) {
        state.chats[chatId] = [];
      }
      state.chats[chatId].push({ ...message, id: Date.now() });
    },
    setNotifications: (state, action: PayloadAction<string[]>) => {
      state.notifications = action.payload;
    },
  },
});

export const { setActiveChat, addMessage, setNotifications } =
  chatsSlice.actions;
export default chatsSlice.reducer;
