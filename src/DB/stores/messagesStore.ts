import { db } from '../database'; // Adjust the import path as needed
import { ConversationsType } from '../../Types/conversationsType';

export async function storeChatMessages(messages: ConversationsType[]): Promise<void> {
    await Promise.all(messages.map(message => db.chatMessages.put(message)));
}

export async function getChatMessage(id: number): Promise<ConversationsType | undefined> {
    return await db.chatMessages.get(id);
}

export async function getMessagesByChatId(id: number): Promise<ConversationsType[] | undefined> {
    return await db.chatMessages.where('id').equals(id).toArray();
}

export async function getAllChatMessages(): Promise<ConversationsType[]> {
    return await db.chatMessages.toArray();
}

export async function deleteChatMessage(id: number): Promise<void> {
    await db.chatMessages.delete(id);
}