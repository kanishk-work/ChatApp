import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { MessagePayload, ReplyPayload } from "../Types/message";
import { ChatRoom } from "../Types/chatRoom";
import { ChatResponse } from "../Types/chats";
import { storeChatData, storeChatMessagesData } from "../DB/database";
import { ConversationsTypeResponse } from "../Types/conversationsType";

export interface JoinGroup {
  toUsersList: number[];
  group_name: string;
}
export interface JoinChat {
  toUserId: number;
}

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_HOST_URL,
    headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` },
  }),
  endpoints: (builder) => ({
    createGroup: builder.mutation<ChatRoom, JoinGroup>({
      query: (body) => ({
        url: `chat/group/join`,
        method: "POST",
        body,
      }),
    }),
    startChat: builder.mutation<ChatRoom, JoinChat>({
      query: (body) => ({
        url: `chat/join`,
        method: "POST",
        body,
      }),
    }),
    sendMessage: builder.mutation<string, MessagePayload>({
      query: (body) => {
        return {
          url: `chat/send`,
          method: "POST",
          body: body,
        };
      },
    }),
    getChats: builder.query<ChatResponse, string | void>({
      query: (searchTerm) => ({
        url: searchTerm ? `chat?search=${encodeURIComponent(searchTerm)}` : `chat`,
        method: "GET",
      }),
      async onQueryStarted(searchTerm, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data && data.list) {
            // Store chats in IndexedDB
            await storeChatData(data.list);
            console.log(data.list)
          }
        } catch (error) {
          console.error('Failed to store chats in IndexedDB:', error);
        }
      },
    }),
    
    getConversations: builder.mutation<ConversationsTypeResponse, number>({
      query: (chatRoomId) => ({
        url: `chat/messages`,
        method: "POST",
        body: { chatRoomId },
      }),
      onQueryStarted: async (chatRoomId, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          // Store messages in IndexedDB
          await storeChatMessagesData(data.list);
        } catch (err) {
          console.error('Failed to store messages in IndexedDB:', err);
        }
      },
    }),
    sendReply: builder.mutation<any, ReplyPayload>({
      query: (body) => ({
        url: `chat/reply`,
        method: "POST",
        body: body ,
      }),
    }),
  }),
});

export const {
  useCreateGroupMutation,
  useStartChatMutation,
  useSendMessageMutation,
  useGetChatsQuery,
  useGetConversationsMutation,
  useSendReplyMutation
} = chatApi as any;
