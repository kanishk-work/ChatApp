import Dexie from 'dexie';
import { Chat } from '../../Types/chats';

// Use a different interface for the database storage
interface ChatForStorage {
    id: number;
    updatedAt: string;
    createdAt: string;
    deletedAt: string | null;
    name: string;
    client_id: number;
    is_group: boolean;
    is_deleted: boolean;
    profile_pic: string | null;
    chatUsers: string; // JSON string
    chatSocket: string; // JSON string
}

class ChatDatabase extends Dexie {
    chats: Dexie.Table<ChatForStorage, number>; // Primary key is number (id)

    constructor() {
        super('ChatAppDB');
        this.version(1).stores({
            chats: '++id, updatedAt, createdAt, deletedAt, name, client_id, is_group, is_deleted, profile_pic'
            // Define indexes as needed
        });

        this.chats = this.table('chats');
    }

    async addChat(chat: Chat): Promise<void> {
        // Serialize nested fields for storage
        const chatForStorage: ChatForStorage = {
            ...chat,
            chatUsers: JSON.stringify(chat.chatUsers),
            chatSocket: JSON.stringify(chat.chatSocket)
        };
        await this.chats.put(chatForStorage);
    }

    async getChat(id: number): Promise<Chat | undefined> {
        const chatForStorage = await this.chats.get(id);
        if (chatForStorage) {
            return {
                ...chatForStorage,
                chatUsers: JSON.parse(chatForStorage.chatUsers),
                chatSocket: JSON.parse(chatForStorage.chatSocket)
            };
        }
        return undefined;
    }

    async getAllChats(): Promise<Chat[]> {
        const chatsForStorage = await this.chats.toArray();
        return chatsForStorage.map(chatForStorage => ({
            ...chatForStorage,
            chatUsers: JSON.parse(chatForStorage.chatUsers),
            chatSocket: JSON.parse(chatForStorage.chatSocket)
        }));
    }

    async deleteChat(id: number): Promise<void> {
        await this.chats.delete(id);
    }
}

const db = new ChatDatabase();

export async function storeChats(chats: Chat[]): Promise<void> {
    await Promise.all(chats.map(chat => db.addChat(chat)));
}

export async function getChat(id: number): Promise<Chat | undefined> {
    return await db.getChat(id);
}

export async function getAllChats(): Promise<Chat[]> {
    return await db.getAllChats();
}

export async function deleteChat(id: number): Promise<void> {
    await db.deleteChat(id);
}
