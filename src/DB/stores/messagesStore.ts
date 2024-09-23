import { db } from '../database'; // Adjust the import path as needed
import { ChatMessage, ChatReaction, ConversationsType } from '../../Types/conversationsType';

export async function storeChatMessages(conversations: ConversationsType[]): Promise<void> {
  await Promise.all(conversations.map(async conversation => {
    const existingConversation = await db.chatMessages.get(conversation.id);
    if(!existingConversation){
      db.chatMessages.put(conversation);
    }
  }));
}

export async function updateMessages(chatRoomId: number, newMessage: ChatMessage, tempMessageId?: number) {
  console.log("updateMessages Working")
  try {
    // Retrieve the conversation by its ID
    const chatMessages = await db.chatMessages.get(chatRoomId);

    if (chatMessages) {
      // Delete message with tempMessageId if tempMessageId is given
      if (tempMessageId) {
        chatMessages.messages.chatsList = chatMessages.messages.chatsList.filter(m => m.id !== tempMessageId);
        chatMessages.messages.length = chatMessages.messages.chatsList.length;
      }
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

export async function addReactionToMessage(
  chatRoomId: number,
  messageId: number,
  updatedReactions: ChatReaction[]
): Promise<void> {
  try {
    const conversation = await db.chatMessages.get(chatRoomId);

    if (conversation) {
      const message = conversation.messages.chatsList.find(m => m.id === messageId);

      if (message) {
        message.chatReactions = updatedReactions;

        await db.chatMessages.put(conversation);

        console.log('Reaction added successfully to the message in the conversation');
      } else {
        console.error('Message not found in the conversation');
      }
    } else {
      console.error('Conversation not found');
    }
  } catch (error) {
    console.error('Error adding reaction:', error);
  }
}

export async function addPinnedMessage(chatRoomId: number, messageId: number) {
  console.log("pin messsage working Working")
  try {
    // Retrieve the conversation by its ID
    const chatMessages = await db.chatMessages.get(chatRoomId);

    if (chatMessages) {
      const message = chatMessages.messages.chatsList.find(m => m.id === messageId);

      if (message) {
        // chatMessages.pinnedChats.push(message);
        await db.chatMessages.put(chatMessages);

        console.log('Pinned message added successfully to the conversation');
      } else {
        console.error('Message not found in the conversation');
      }
    } else {
      console.error('Conversation not found');
    }
  

  } catch (error) {
    console.error('Failed to update messages:', error);
  }
}

export async function getChatMessage(id: number): Promise<ConversationsType | undefined> {
  const chatMessages = await db.chatMessages.get(id);
  if (chatMessages) {
    return chatMessages
  }
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