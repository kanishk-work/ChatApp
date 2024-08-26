import Dexie from 'dexie';
import { ChatMessage } from '../../Types/chats';

// Use a different interface for the database storage
interface ChatMessageForStorage {
    id: number;
    updatedAt: string;
    createdAt: string;
    deletedAt: string | null;
    chatFiles: string; // JSON string
    chatReactions: string; // JSON string
    chatStatus: string; // JSON string
    sender_id: number;
    receiver_id: number;
    message: string;
    chat_room_id: number;
    is_reply: boolean;
    parent_chat_id: number | null;
    is_deleted: boolean;
}

class MessageDatabase extends Dexie {
    chatMessages: Dexie.Table<ChatMessageForStorage, number>; // Primary key is number (id)

    constructor() {
        super('ChatAppDB');
        this.version(1).stores({
            chatMessages: '++id, updatedAt, createdAt, deletedAt, sender_id, receiver_id, chat_room_id, is_reply, parent_chat_id, is_deleted'
            // Define indexes as needed
        });

        this.chatMessages = this.table('chatMessages');
    }

    async addChatMessage(message: ChatMessage): Promise<void> {
        // Serialize nested fields for storage
        const messageForStorage: ChatMessageForStorage = {
            ...message,
            chatFiles: JSON.stringify(message.chatFiles),
            chatReactions: JSON.stringify(message.chatReactions),
            chatStatus: JSON.stringify(message.chatStatus)
        };
        await this.chatMessages.put(messageForStorage);
    }

    async getChatMessage(id: number): Promise<ChatMessage | undefined> {
        const messageForStorage = await this.chatMessages.get(id);
        if (messageForStorage) {
            return {
                ...messageForStorage,
                chatFiles: JSON.parse(messageForStorage.chatFiles),
                chatReactions: JSON.parse(messageForStorage.chatReactions),
                chatStatus: JSON.parse(messageForStorage.chatStatus)
            };
        }
        return undefined;
    }

    async getAllChatMessages(): Promise<ChatMessage[]> {
        const messagesForStorage = await this.chatMessages.toArray();
        return messagesForStorage.map(messageForStorage => ({
            ...messageForStorage,
            chatFiles: JSON.parse(messageForStorage.chatFiles),
            chatReactions: JSON.parse(messageForStorage.chatReactions),
            chatStatus: JSON.parse(messageForStorage.chatStatus)
        }));
    }

    async deleteChatMessage(id: number): Promise<void> {
        await this.chatMessages.delete(id);
    }
}

const db = new MessageDatabase();

export async function storeChatMessages(messages: ChatMessage[]): Promise<void> {
    await Promise.all(messages.map(message => db.addChatMessage(message)));
}

export async function getChatMessage(id: number): Promise<ChatMessage | undefined> {
    return await db.getChatMessage(id);
}

export async function getAllChatMessages(): Promise<ChatMessage[]> {
    return await db.getAllChatMessages();
}

export async function deleteChatMessage(id: number): Promise<void> {
    await db.deleteChatMessage(id);
}
