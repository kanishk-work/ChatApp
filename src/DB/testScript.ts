// testDatabase.ts
import { Chat, ChatMessage } from '../Types/chats';
import { initializeDatabase, storeChatData, storeChatMessagesData } from './database';

export async function createTestData() {
    // Initialize the database
    await initializeDatabase();

    // Sample chat data
    // const chats: Chat[] = [
    //     {
    //         id: 1,
    //         updatedAt: new Date().toISOString(),
    //         createdAt: new Date().toISOString(),
    //         deletedAt: null,
    //         name: "General Chat",
    //         client_id: 123,
    //         is_group: true,
    //         is_deleted: false,
    //         profile_pic: null,
    //         chatUsers: [
    //             {
    //                 id: 1,
    //                 updatedAt: new Date().toISOString(),
    //                 createdAt: new Date().toISOString(),
    //                 deletedAt: null,
    //                 chat_room_id: 1,
    //                 user_id: 1,
    //                 user: {
    //                     id: 1,
    //                     updatedAt: new Date().toISOString(),
    //                     createdAt: new Date().toISOString(),
    //                     deletedAt: null,
    //                     client_id: 123,
    //                     full_name: "Alice",
    //                     short_name: "Al",
    //                     client_user_id: "alice123",
    //                     role: "user",
    //                     email: "alice@example.com",
    //                     mobile_no: "1234567890",
    //                     profile_pic: null,
    //                     status: "active"
    //                 },
    //                 is_group_admin: true,
    //                 user_exited: false
    //             }
    //         ],
    //         chatSocket: [
    //             {
    //                 id: 1,
    //                 updatedAt: new Date().toISOString(),
    //                 createdAt: new Date().toISOString(),
    //                 deletedAt: null,
    //                 socket_room: "room1",
    //                 chat_room_id: 1
    //             }
    //         ]
    //     }
    // ];

    // Store the sample data
    // await storeChatData(chats);

    const messages: ChatMessage[] = [
        {
            id: 1,
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            deletedAt: null,
            chatFiles: [], // Add file data if needed
            chatReactions: [], // Add reaction data if needed
            chatStatus: [
                {
                    id: 1,
                    updatedAt: new Date().toISOString(),
                    createdAt: new Date().toISOString(),
                    deletedAt: null,
                    user_id: 1,
                    chat_id: 1,
                    chat_reply_id: null,
                    delivered: true,
                    read: false
                }
            ],
            sender_id: 1,
            receiver_id: 2,
            message: "Hello, world!",
            chat_room_id: 1,
            is_reply: false,
            parent_chat_id: null,
            is_deleted: false
        }
    ];

    // Store the sample data
    await storeChatMessagesData(messages);

    console.log("Test data added to the database.");
}

createTestData().catch(error => console.error("Error creating test data:", error));
