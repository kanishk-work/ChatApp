import { db } from '../database'; 
import { Chat, LatestMessage } from '../../Types/chats';

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

export async function updateLatestMessage(chatRoomId: number, newMessage: LatestMessage) {
    console.log("update latest chat Working")
    try {
        // Retrieve the chat by its ID
        const chat = await db.chats.get(chatRoomId);

        if (chat) {
            // Update the message
            chat.lastMessage = newMessage;

            // Save the updated conversation back to IndexedDB
            await db.chats.put(chat);
        } else {
            console.error('Chat not found');
        }
    } catch (error) {
        console.error('Failed to update latest message:', error);
    }
}