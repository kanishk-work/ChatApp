import {
  storeChats,
  getChat,
  getAllChats,
  deleteChat
} from './stores/chatsStore';

import {
  storeChatMessages,
  getChatMessage,
  getAllChatMessages,
  deleteChatMessage
} from './stores/messagesStore';

import { Chat, ChatMessage } from '../Types/chats';

export async function initializeDatabase(): Promise<void> {
  // Dexie automatically initializes the database, so no manual initialization is required.
}

// Chat Store Operations
export async function storeChatData(chats: Chat[]): Promise<void> {
  await storeChats(chats);
}

export async function getChatData(id: number): Promise<Chat | undefined> {
  return await getChat(id);
}

export async function getAllChatsData(): Promise<Chat[]> {
  return await getAllChats();
}

export async function deleteChatData(id: number): Promise<void> {
  await deleteChat(id);
}

// Chat Messages Store Operations
export async function storeChatMessagesData(messages: ChatMessage[]): Promise<void> {
  await storeChatMessages(messages);
}

export async function getChatMessageData(id: number): Promise<ChatMessage | undefined> {
  return await getChatMessage(id);
}

export async function getAllChatMessagesData(): Promise<ChatMessage[]> {
  return await getAllChatMessages();
}

export async function deleteChatMessageData(id: number): Promise<void> {
  await deleteChatMessage(id);
}
