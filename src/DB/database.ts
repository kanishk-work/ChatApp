import {
  storeChats,
  getChat,
  getAllChats,
  deleteChat,
  updateLatestMessage,
  updateUnreadMessageCount,
} from "./stores/chatsStore";

import {
  storeChatMessages,
  getChatMessage,
  getAllChatMessages,
  getMessagesByChatId,
  deleteChatMessage,
  updateMessages,
  addReactionToMessage,
} from "./stores/messagesStore";

import { Chat, LatestMessage } from "../Types/chats";
import {
  ChatMessage,
  ChatReaction,
  ConversationsType,
} from "../Types/conversationsType";
import Dexie from "dexie";

class ChatAppDatabase extends Dexie {
  chats: Dexie.Table<Chat, number>;
  chatMessages: Dexie.Table<ConversationsType, number>;

  constructor() {
    super("ChatAppDB");
    this.version(1).stores({
      chats:
        "++id, updatedAt, createdAt, deletedAt, name, client_id, is_group, is_deleted, profile_pic",
      chatMessages:
        "++id, updatedAt, createdAt, deletedAt, client_id, is_group, is_deleted",
    });

    this.chats = this.table("chats");
    this.chatMessages = this.table("chatMessages");

    this.addBeforeUnloadListener();
  }

  addBeforeUnloadListener() {
    window.addEventListener("beforeunload", () => {
      if (navigator.onLine) {
        this.clearDatabase(); // Only clear the database if the user is online
      }
    });
  }

  // Function to clear database
  async clearDatabase() {
    try {
      await this.delete(); // Deletes the entire database
    } catch (error) {
      console.error("Failed to clear the database:", error);
    }
  }
}

export const db = new ChatAppDatabase();

// Chat Store Operations
export async function storeChatData(chats: Chat[]): Promise<void> {
  await storeChats(chats);
}

export async function getChatData(
  id: number | null
): Promise<Chat | undefined> {
  return await getChat(id);
}

export async function getAllChatsData(): Promise<Chat[]> {
  return await getAllChats();
}

export async function deleteChatData(id: number): Promise<void> {
  await deleteChat(id);
}

export async function updateLatestMessageData(
  chatRoomId: number,
  newMessage: LatestMessage
) {
  return await updateLatestMessage(chatRoomId, newMessage);
}

export async function updateUnreadMessageCountData(
  chatRoomId: number,
  actionType: "increment" | "reset"
) {
  return await updateUnreadMessageCount(chatRoomId, actionType);
}

// Chat Messages Store Operations
export async function storeChatMessagesData(
  messages: ConversationsType[]
): Promise<void> {
  await storeChatMessages(messages);
}

export async function updateMessagesData(
  chatRoomId: number,
  newMessage: ChatMessage,
  tempMessageId?: number
) {
  return await updateMessages(chatRoomId, newMessage, tempMessageId);
}

export async function addReactionToMessageData(
  chatRoomId: number,
  messageId: number,
  updatedReactions: ChatReaction[]
): Promise<void> {
  return await addReactionToMessage(chatRoomId, messageId, updatedReactions);
}
export async function getChatMessageData(
  id: number
): Promise<ConversationsType | undefined> {
  return await getChatMessage(id);
}

export async function getMessagesByChatIdData(
  id: number
): Promise<ConversationsType[] | undefined> {
  return await getMessagesByChatId(id);
}

export async function getAllChatMessagesData(): Promise<ConversationsType[]> {
  return await getAllChatMessages();
}

export async function deleteChatMessageData(id: number): Promise<void> {
  await deleteChatMessage(id);
}
