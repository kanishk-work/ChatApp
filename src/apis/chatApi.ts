import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { MessagePayload, ReplyPayload } from "../Types/message";
import { ChatRoom } from "../Types/chatRoom";
import { ChatResponse } from "../Types/chats";
import { storeChatData, storeChatMessagesData } from "../DB/database";
import { ConversationsTypeResponse } from "../Types/conversationsType";
import {
  setChatsLoading,
  setConversationsLoading,
} from "../Redux/slices/loadingSlice";
import { useAppDispatch } from "../Redux/hooks";

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
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("viralEffect");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
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
        url: searchTerm
          ? `chat?search=${encodeURIComponent(searchTerm)}`
          : `chat`,
        method: "GET",
      }),
      async onQueryStarted(
        searchTerm,
        { dispatch = useAppDispatch(), queryFulfilled }
      ) {
        if (navigator.onLine) {
          dispatch(setChatsLoading(true));
          try {
            const { data } = await queryFulfilled;
            if (data && data.list) {
              // Store chats in IndexedDB
              await storeChatData(data.list);
              console.log(data.list);
            }
          } catch (error) {
            console.error("Failed to store chats in IndexedDB:", error);
          } finally {
            dispatch(setChatsLoading(false));
          }
        } else return;
      },
    }),

    getConversations: builder.mutation<ConversationsTypeResponse, number>({
      query: (chatRoomId) => ({
        url: `chat/messages`,
        method: "POST",
        body: { chatRoomId },
      }),
      onQueryStarted: async (
        chatRoomId,
        { dispatch = useAppDispatch(), queryFulfilled }
      ) => {
        if (navigator.onLine) {
          dispatch(setConversationsLoading(true));

          try {
            const { data } = await queryFulfilled;

            // Store messages in IndexedDB
            await storeChatMessagesData(data.list);
          } catch (err) {
            console.error("Failed to store messages in IndexedDB:", err);
          } finally {
            dispatch(setConversationsLoading(false));
          }
        } else return;
      },
    }),

    getPreviousMessages: builder.mutation<ConversationsTypeResponse, object>({
      query: (data: {chatRoomId: number, lastMessageId: number}) => ({
        url: `chat/messages`,
        method: "POST",
        body: data
      }),
      onQueryStarted: async (
        chatRoomId,
        { dispatch, queryFulfilled }
      ) => {
        if (navigator.onLine) {
          try {
            const { data } = await queryFulfilled;
          } catch (err) {
            console.error("Failed to store messages in IndexedDB:", err);
          }
        } else return;
      },
    }),

    sendReply: builder.mutation<any, ReplyPayload>({
      query: (body) => ({
        url: `chat/reply`,
        method: "POST",
        body: body,
      }),
    }),

    uploadFile: builder.mutation<any, FormData>({
      query: (body) => ({
        url: `image/upload`,
        method: "POST",
        body: body,
      }),
    }),
    messageReact: builder.mutation<any, object>({
      query: (body) => ({
        url: `chat/react`,
        method: "POST",
        body: body,
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
  useGetPreviousMessagesMutation,
  useSendReplyMutation,
  useUploadFileMutation,
  useMessageReactMutation
} = chatApi as any;
