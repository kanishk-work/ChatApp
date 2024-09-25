import { db } from "../database"; // Adjust the import path as needed
import {
  ChatMessage,
  ChatReaction,
  ConversationsType,
} from "../../Types/conversationsType";

export async function storeChatMessages(
  messages: ConversationsType[]
): Promise<void> {
  await Promise.all(messages.map((message) => db.chatMessages.put(message)));
}

export async function updateMessages(
  chatRoomId: number,
  newMessage: ChatMessage,
  tempMessageId?: number
) {
  try {
    // Retrieve the conversation by its ID
    const chatMessages = await db.chatMessages.get(chatRoomId);

    if (chatMessages) {
      // Delete message with tempMessageId if tempMessageId is given
      if (tempMessageId) {
        chatMessages.messages.chatsList =
          chatMessages.messages.chatsList.filter((m) => m.id !== tempMessageId);
        chatMessages.messages.length = chatMessages.messages.chatsList.length;
      }
      // Update the messages
      chatMessages.messages.chatsList.push(newMessage);
      chatMessages.messages.length = chatMessages.messages.chatsList.length;

      // Save the updated conversation back to IndexedDB
      await db.chatMessages.put(chatMessages);
    } else {
      console.error("Conversation not found");
    }
  } catch (error) {
    console.error("Failed to update messages:", error);
  }
}

export async function addReactionToMessage(
  chatRoomId: number,
  messageId: number,
  updatedReactions: ChatReaction[]
): Promise<void> {
  try {
    const conversation = await db.chatMessages.get(chatRoomId);

    if (conversation) {
      const message = conversation.messages.chatsList.find(
        (m) => m.id === messageId
      );

      if (message) {
        message.chatReactions = updatedReactions;

        await db.chatMessages.put(conversation);
      } else {
        console.error("Message not found in the conversation");
      }
    } else {
      console.error("Conversation not found");
    }
  } catch (error) {
    console.error("Error adding reaction:", error);
  }
}

export async function getChatMessage(
  id: number
): Promise<ConversationsType | undefined> {
  const chatMessages = await db.chatMessages.get(id);
  if (chatMessages) {
    return chatMessages;
  }
}

export async function getMessagesByChatId(
  id: number
): Promise<ConversationsType[] | undefined> {
  return await db.chatMessages.where("id").equals(id).toArray();
}

export async function getAllChatMessages(): Promise<ConversationsType[]> {
  return await db.chatMessages.toArray();
}

export async function deleteChatMessage(id: number): Promise<void> {
  await db.chatMessages.delete(id);
}
