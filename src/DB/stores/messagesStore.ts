import { db } from '../database'; // Adjust the import path as needed
import { ChatMessage, ConversationsType } from '../../Types/conversationsType';

export async function storeChatMessages(messages: ConversationsType[]): Promise<void> {
    await Promise.all(messages.map(message => db.chatMessages.put(message)));
}

export async function updateMessages(chatRoomId: number, newMessage: ChatMessage) {
    console.log("updateMessages Working")
    try {
        // Retrieve the conversation by its ID
        const chatMessages = await db.chatMessages.get(chatRoomId);

        if (chatMessages) {
            // Update the messages
            chatMessages.messages.chatsList.push(newMessage);
            chatMessages.messages.length = chatMessages.messages.chatsList.length;

            // Save the updated conversation back to IndexedDB
            await db.chatMessages.put(chatMessages);
        } else {
            console.error('Conversation not found');
        }
    } catch (error) {
        console.error('Failed to update messages:', error);
    }
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