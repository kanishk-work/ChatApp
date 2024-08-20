import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { MessagePayload } from "../Types/message";
import { ChatRoom } from "../Types/chatRoom";
import { ChatResponse, ConversationsType } from "../Types/chats";

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
    getChats: builder.query<ChatResponse, void>({
      query: () => ({
        url: `chat`,
        method: "GET",
      }),
    }),
    getConversations: builder.mutation<ConversationsType, number>({
      query: (chatRoomId) => ({
        url: `chat/messages`,
        method: "POST",
        body: { chatRoomId },
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
} = chatApi as any;
