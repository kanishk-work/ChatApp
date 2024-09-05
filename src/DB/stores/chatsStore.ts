import { db } from '../database'; 
import { Chat, LatestMessage } from '../../Types/chats';

// export async function storeChats(chats: Chat[]): Promise<void> {
//     await Promise.all(chats.map(chat => db.chats.put(chat)));
// }

export async function storeChats(chats: Chat[]): Promise<void> {
    const chatsWithUnreadCount = chats.map(chat => ({
        ...chat,
        unreadCount: 0, // Default value, to be getting from server
    }));

    await Promise.all(chatsWithUnreadCount.map(chat => db.chats.put(chat)));
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

export async function updateUnreadMessageCount(chatRoomId: number, actionType: 'increment' | 'reset') {
    console.log("update unread message count Working");
    try {
        // Retrieve the chat by its ID
        const chat = await db.chats.get(chatRoomId);

        if (chat) {
            // Update the unreadCount based on the actionType
            if (actionType === 'increment') {
                chat.unreadCount += 1;
            } else if (actionType === 'reset') {
                chat.unreadCount = 0;
            }

            // Save the updated chat back to IndexedDB
            await db.chats.put(chat);
        } else {
            console.error('Chat not found');
        }
    } catch (error) {
        console.error('Failed to update unread message count:', error);
    }
}
