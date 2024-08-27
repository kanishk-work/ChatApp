import Dexie from 'dexie';
import { ConversationsType } from '../../Types/conversationsType';

// Define a storage-specific interface for Conversations
interface ConversationsTypeForStorage {
    id: number;
    updatedAt: string;
    createdAt: string;
    deletedAt: string | null;
    name: string;
    client_id: number;
    is_group: boolean;
    profile_pic: string | null;
    is_deleted: boolean;
    messages: string; // Store messages as a JSON string
}

class MessageDatabase extends Dexie {
    chatMessages: Dexie.Table<ConversationsTypeForStorage, number>; // Primary key is number (id)

    constructor() {
        super('ChatAppDB');
        this.version(1).stores({
            chatMessages: '++id, updatedAt, createdAt, deletedAt, client_id, is_group, is_deleted'
            // Define indexes as needed
        });

        this.chatMessages = this.table('chatMessages');
    }

    async addChatMessage(chat: ConversationsType): Promise<void> {
        // Serialize nested fields for storage
        const chatForStorage: ConversationsTypeForStorage = {
            ...chat,
            messages: JSON.stringify(chat.messages),
        };
        await this.chatMessages.put(chatForStorage);
    }

    async getChatMessage(id: number): Promise<ConversationsType | undefined> {
        const chatForStorage = await this.chatMessages.get(id);
        if (chatForStorage) {
            return {
                ...chatForStorage,
                messages: JSON.parse(chatForStorage.messages),
            };
        }
        return undefined;
    }

    async getMessagesByChatId(chatId: number): Promise<ConversationsType[] | undefined> {
        const chatsForStorage = await this.chatMessages.where('id').equals(chatId).toArray();
        return chatsForStorage.map(chatForStorage => ({
            ...chatForStorage,
            messages: JSON.parse(chatForStorage.messages),
        }));
    }

    async getAllChatMessages(): Promise<ConversationsType[]> {
        const chatsForStorage = await this.chatMessages.toArray();
        return chatsForStorage.map(chatForStorage => ({
            ...chatForStorage,
            messages: JSON.parse(chatForStorage.messages),
        }));
    }

    async deleteChatMessage(id: number): Promise<void> {
        await this.chatMessages.delete(id);
    }
}

const db = new MessageDatabase();

export async function storeChatMessages(chats: ConversationsType[]): Promise<void> {
    await Promise.all(chats.map(chat => db.addChatMessage(chat)));
}

export async function getChatMessage(id: number): Promise<ConversationsType | undefined> {
    return await db.getChatMessage(id);
}

export async function getMessagesByChatId(id: number): Promise<ConversationsType[] | undefined> {
    return await db.getMessagesByChatId(id);
}

export async function getAllChatMessages(): Promise<ConversationsType[]> {
    return await db.getAllChatMessages();
}

export async function deleteChatMessage(id: number): Promise<void> {
    await db.deleteChatMessage(id);
}
