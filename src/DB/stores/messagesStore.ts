import { db } from '../database'; // Adjust the import path as needed
import { ChatMessage, ChatReaction, ConversationsType, PinnedChat } from '../../Types/conversationsType';

export async function storeChatMessages(conversations: ConversationsType[]): Promise<void> {
  await Promise.all(conversations.map(async conversation => {
    const existingConversation = await db.chatMessages.get(conversation.id);
    if (!existingConversation) {
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
    await db.chatMessages.where("id").equals(chatRoomId).modify((conversation) => {
      // Find the specific message in the chatsList array
      const message = conversation.messages.chatsList.find(m => m.id === messageId);
      
      if (message) {
        // Update the chatReactions field of the found message
        message.chatReactions = updatedReactions;
      } else {
        console.error(`Message with messageId ${messageId} not found in conversation.`);
      }
    });

    console.log('Reactions updated successfully for the message');
  } catch (error) {
    console.error(`Error updating reactions for messageId ${messageId} in chatRoomId ${chatRoomId}:`, error);
  }
}

export async function addPinnedMessage(pinnedMessageData: PinnedChat) {
  console.log("pin messsage working Working")

  db.chatMessages.where("id").equals(pinnedMessageData.chat_room_id).modify({
    pinnedChat: [pinnedMessageData]
  })
    .then(() => {
      console.log("Chat updated successfully");
    })
    .catch((error) => {
      console.error('Failed to update messages:', error);
    });
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