import { db } from '../database'; 
import { Chat } from '../../Types/chats';

export async function storeChats(chats: Chat[]): Promise<void> {
    await Promise.all(chats.map(chat => db.chats.put(chat)));
}

export async function getChat(id: number | null): Promise<Chat | undefined> {
    return id? await db.chats.get(id) : undefined
}

export async function getAllChats(): Promise<Chat[]> {
    return await db.chats.toArray();
}

export async function deleteChat(id: number): Promise<void> {
    await db.chats.delete(id);
}
