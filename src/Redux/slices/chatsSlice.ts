import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { chatApi } from "../../apis/chatApi";
import { Chat, LatestMessage } from "../../Types/chats";
import { ChatMessage, ChatReaction, ConversationsType } from "../../Types/conversationsType";

// Update the ChatMessage interface to align with API response
export interface ChatMessagePayload {
  receiver_id: number | undefined;
  message: string;
  chat_room_id: number | undefined;
  files_list: string[] | [];
}

interface TypingStatus {
  [frq: string]: string | null; // Maps chat IDs to the user who is typing, or null if no one is typing
}

export interface ChatsState {
  chats: Chat[];
  conversations: ConversationsType[];
  activeChatId: number | null;
  notifications: string[];
  currentUserId: number;
  typing: TypingStatus; // Add this line
}

const initialState: ChatsState = {
  chats: [],
  conversations: [],
  activeChatId: null,
  notifications: [],
  currentUserId: 1,
  typing: {}, // Initialize typing status
};

interface SetUnreadCountPayload {
  chatRoomId: number;
  actionType: 'increment' | 'reset';
}

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
    setUnreadCountChat: (state, action: PayloadAction<SetUnreadCountPayload>) => {
      const { chatRoomId, actionType } = action.payload;
      console.log("unread message update chat ID in redux: ", chatRoomId, "Action Type:", actionType);
    
      const chatToUpdate = state.chats.find((chat) => chat.id === chatRoomId);
    
      if (chatToUpdate) {
        if (actionType === 'increment') {
          chatToUpdate.unreadCount += 1;
        } else if (actionType === 'reset') {
          chatToUpdate.unreadCount = 0;
        }
      }
    },
    setTypingStatus: (state, action: PayloadAction<{ frq: string; userName: string | null }>) => {
      const { frq, userName } = action.payload;
      state.typing[frq] = userName;
    },

    setUpdatedReactions: (state, action: PayloadAction<{ chatRoomId: number; messageId: number; updatedReactions: ChatReaction[] }>) => {
      const { chatRoomId, messageId, updatedReactions } = action.payload;
    
      const conversation = state.conversations.find(conv => conv.id === chatRoomId);
    
      if (conversation) {
        const message = conversation.messages.chatsList.find(msg => msg.id === messageId);
        
        if (message) {
          message.chatReactions = updatedReactions;
          
          console.log('Reaction added to message in Redux state:', updatedReactions);
        } else {
          console.error('Message not found in the conversation');
        }
      } else {
        console.error('Conversation not found');
      }
    }
  },
});

export const { setActiveChatId, setNotifications, setConversations, setNewMessage, setChats, setLatestMessageChat, setUnreadCountChat, setTypingStatus, setUpdatedReactions } = chatsSlice.actions;
export default chatsSlice.reducer;
