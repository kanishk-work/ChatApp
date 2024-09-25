import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { chatApi } from "../../apis/chatApi";
import { Chat, LatestMessage, UnreadMsgs } from "../../Types/chats";
import { ChatMessage, ChatReaction, ConversationsType, PinnedChat } from "../../Types/conversationsType";

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
  newMessageId?: number;
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
    setNewMessage: (state, action: PayloadAction<{ newMessage?: ChatMessage, tempMessageId?: Number }>) => {
      const { newMessage, tempMessageId } = action.payload;
      console.log("new message in redux: ", newMessage)

      if (tempMessageId) {
        const messageToDelete = state.conversations[0].messages.chatsList.find((message) => message.id === tempMessageId);
        if (messageToDelete) {
          state.conversations[0].messages.chatsList = state.conversations[0].messages.chatsList.filter((message) => message.id !== tempMessageId);
        }
      }

      newMessage && state.conversations[0].messages.chatsList.push(newMessage)
    },
    setOlderMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      const olderMessages = action.payload;
      console.log("older messages in redux: ", olderMessages);

      // Prepending older messages to the chatsList array
      state.conversations[0].messages.chatsList.unshift(...olderMessages);
    },
    setPinMessage: (state, action: PayloadAction<PinnedChat>) => {
      const newPinnedMessageData = action.payload;

      if (newPinnedMessageData) {
        // Find the conversation by chatRoomId
        const conversation = state.conversations.find(
          conv => conv.id === newPinnedMessageData.chat_room_id
        );

        if (conversation) {
          // Update the pinned message in the conversation
          conversation.pinnedChat = [newPinnedMessageData];
        } else {
          console.error(`Conversation with chatRoomId ${newPinnedMessageData.chat_room_id} not found.`);
        }
      }
    },
    setReadStatusDataChat: (state, action: PayloadAction<{ chatRoomId: number, userId: number, chatIdList: UnreadMsgs }>) => {
      const { chatRoomId, userId, chatIdList } = action.payload;
      console.log("read status update data in redux: ", action.payload);

      const convToUpdate = state.conversations.find((conv) => conv.id === chatRoomId);

      if (convToUpdate) {
        chatIdList.forEach(chatMsgId => {
          const message = convToUpdate.messages.chatsList.find(m => m.id === chatMsgId.chat_id);
          if (message) {
            const status = message.chatStatus.find(status => status.user_id === userId);
            if (status) {
              status.read = true;
            }
          }
        });
      }
    },

    // Chats list updates
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    setNewChat: (state, action: PayloadAction<Chat>) => {
      const newChat = action.payload;
      console.log("new chat in redux: ", newChat)

      state.chats.push(newChat)
    },

    setLatestMessageChat: (state, action: PayloadAction<LatestMessage>) => {
      const newMessage = action.payload;
      console.log("latest message in redux: ", newMessage)

      const chatToUpdate = state.chats.find((chat) => chat.id === newMessage.chat_room_id);

      if (chatToUpdate) {
        chatToUpdate.lastMessage = newMessage;
      }
    },

    setUnreadMessagesDataChat: (state, action: PayloadAction<SetUnreadCountPayload>) => {
      const { chatRoomId, actionType, newMessageId } = action.payload;
      console.log("unread message update chat ID in redux: ", chatRoomId, "Action Type:", actionType);

      const chatToUpdate = state.chats.find((chat) => chat.id === chatRoomId);

      if (chatToUpdate) {
        if (actionType === 'increment' && newMessageId) {
          chatToUpdate.unreadCount += 1;
          chatToUpdate.unreadMsgs.push({ chat_id: newMessageId })
        } else if (actionType === 'reset') {
          chatToUpdate.unreadCount = 0;
          chatToUpdate.unreadMsgs = [];
        }
      }
    },

    setTypingStatus: (state, action: PayloadAction<{ frq: string; userName: string | null }>) => {
      const { frq, userName } = action.payload;
      state.typing[frq] = userName;
    },

    setUpdatedReactions: (state, action: PayloadAction<{ messageId: number; updatedReactions: ChatReaction[] }>) => {
      const { messageId, updatedReactions } = action.payload;

      const message = state.conversations[0].messages.chatsList.find(msg => msg.id === messageId);

      if (message) {
        message.chatReactions = updatedReactions;

        console.log('Reaction added to message in Redux state:', updatedReactions);
      } else {
        console.error('Message not found in the conversation');
      }
    },

    setLatestMessageReadStatus: (state, action: PayloadAction<{ chatRoomId: number, userId: number, chatIdList: UnreadMsgs }>) => {
      const { chatRoomId, userId, chatIdList } = action.payload;
      console.log("latest read status update data in redux: ", action.payload);

      const chatToUpdate = state.chats.find((chat) => chat.id === chatRoomId);

      if (chatToUpdate) {
        const lastMessage = chatToUpdate.lastMessage;
        if (chatIdList.some(msg => msg.chat_id === lastMessage.id)) {
          const status = lastMessage.chatStatus.find(status => status.user_id === userId);
          if (status) {
            status.read = true;
          }
        }
      }
    },
  },
});

export const { setActiveChatId, setNotifications, setConversations, setNewMessage, setOlderMessages, setChats, setNewChat, setLatestMessageChat, setUnreadMessagesDataChat, setTypingStatus, setUpdatedReactions, setPinMessage, setReadStatusDataChat, setLatestMessageReadStatus } = chatsSlice.actions;
export default chatsSlice.reducer;
