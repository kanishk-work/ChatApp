import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { chatApi } from "../../apis/chatApi";
import { Chat, LatestMessage } from "../../Types/chats";
import { ChatMessage, ConversationsType } from "../../Types/conversationsType";

// Update the ChatMessage interface to align with API response
export interface ChatMessagePayload {
  receiver_id: number | undefined;
  message: string;
  chat_room_id: number | undefined;
  files_list: string[] | [];
}

export interface ChatsState {
  chats: Chat[];
  conversations: ConversationsType[];
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
    setConversations: (state, action: PayloadAction<ConversationsType[]>) => {
      state.conversations = action.payload;
    },
    setNewMessage: (state, action: PayloadAction<ChatMessage>) => {
      const newMessage = action.payload;
      console.log("new message in redux: ", newMessage)

      state.conversations[0].messages.chatsList.push(newMessage) 
    },
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    setLatestMessageChat: (state, action: PayloadAction<LatestMessage>) => {
      const newMessage = action.payload;
      console.log("latest message in redux: ", newMessage)
      
      const chatToUpdate = state.chats.find((chat)=>chat.id === newMessage.chat_room_id);
      
      if(chatToUpdate){
        chatToUpdate.lastMessage = newMessage;
      }
    },
    setUnreadCountChat: (state, action: PayloadAction<number>) => {
      const chatRoomId = action.payload;
      console.log("unread message update chat ID in redux: ", chatRoomId)
      
      const chatToUpdate = state.chats.find((chat)=>chat.id === chatRoomId);
      
      if(chatToUpdate){
        chatToUpdate.unreadCount += 1;
      }
    },
  },
});

export const { setActiveChatId, setNotifications, setConversations, setNewMessage, setChats, setLatestMessageChat, setUnreadCountChat } = chatsSlice.actions;
export default chatsSlice.reducer;
