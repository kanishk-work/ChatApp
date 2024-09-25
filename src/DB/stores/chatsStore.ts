import { db } from '../database';
import { Chat, LatestMessage, UnreadMsgs } from '../../Types/chats';

export async function storeChats(chats: Chat[]): Promise<void> {
    await Promise.all(chats.map(async chat => {
        const existingChat = await db.chats.get(chat.id);
        if (!existingChat) {
            await db.chats.put(chat);
        }
    }));
}

export async function getChat(id: number | null): Promise<Chat | undefined> {
    return id ? await db.chats.get(id) : undefined
}

export async function getAllChats(): Promise<Chat[]> {
    return await db.chats.toArray();
}

export async function deleteChat(id: number): Promise<void> {
    await db.chats.delete(id);
}

export async function deleteGroupMember(chat_room_id: number | null, user_id: number | null): Promise<void> {
    // delete member from chat if the chat is group
    console.log("delete group member Working")
    try {
        const chat = chat_room_id ? await db.chats.get(chat_room_id) : undefined;

        if (chat) {
            const updatedChatUsers = chat.chatUsers.filter(user => user.user_id !== user_id);
            chat.chatUsers = updatedChatUsers;

            await db.chats.put(chat);
        } else {
            console.error('Chat not found');
        }
    } catch (error) {
        console.error('Failed to delete group member:', error);
    }
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

export async function updateLatestMessageReadStatus(data: { chatRoomId: number, userId: number, chatIdList: UnreadMsgs }) {
    console.log("update latest message read status Working");
    const { chatRoomId, userId, chatIdList } = data;
    try {
        await db.chats.where('id').equals(chatRoomId).modify(chat => {
            const lastMessage = chat.lastMessage;
            if (chatIdList.some(msg => msg.chat_id === lastMessage.id)) {
                const status = lastMessage.chatStatus.find(status => status.user_id === userId);
                if (status) {
                    status.read = true;
                }
            }
        });
    } catch (error) {
        console.error('Failed to update unread message count:', error);
    }
}

export async function updateUnreadMessages(data: { chatRoomId: number, actionType: 'increment' | 'reset', newMessageId?: number }) {
    console.log("update unread message count Working");
    const { chatRoomId, actionType, newMessageId } = data;
    try {
        await db.chats.where('id').equals(chatRoomId).modify(chat => {
            if (actionType === 'increment' && newMessageId) {
                chat.unreadCount = (chat.unreadCount || 0) + 1;
                chat.unreadMsgs.push({ chat_id: newMessageId });
            } else if (actionType === 'reset') {
                chat.unreadCount = 0;
                chat.unreadMsgs = [];
            }
        });
    } catch (error) {
        console.error('Failed to update unread message count:', error);
    }
}

