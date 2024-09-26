import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { MessagePayload, ReplyPayload } from "../Types/message";
import { ChatRoom } from "../Types/chatRoom";
import { ChatResponse, UnreadMsgs } from "../Types/chats";
import {
  addPinnedMessageData,
  storeChatData,
  storeChatMessagesData,
} from "../DB/database";
import {
  ConversationsTypeResponse,
  PinnedChat,
} from "../Types/conversationsType";
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

export interface PinChatRes {
  data: PinnedChat;
}

export const chatApi: any = createApi({
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
        // @ts-ignore
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
        // @ts-ignore
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

    searchMessages: builder.mutation<ConversationsTypeResponse, string>({
      query: (searchTerm) => ({
        url: `chat/messages?search=${encodeURIComponent(searchTerm)}`,
        method: "POST",
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        if (navigator.onLine) {
          try {
            await queryFulfilled;
          } catch (err) {
            console.error("Failed to store messages in IndexedDB:", err);
          }
        } else return;
      },
    }),

    pinMessage: builder.mutation<
      PinChatRes,
      { chat_room_id: number; chat_id: number }
    >({
      query: (data) => ({
        url: `chat/pin`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        if (navigator.onLine) {
          try {
            const { data } = await queryFulfilled;
            await addPinnedMessageData(data.data);
          } catch (err) {
            console.error("Failed to update pinned message in IndexedDB:", err);
          }
        } else return;
      },
    }),

    getPreviousMessages: builder.mutation<
      ConversationsTypeResponse,
      { chatRoomId: number; lastMessageId: number }
    >({
      query: (data) => ({
        url: `chat/messages`,
        method: "POST",
        body: data,
      }),
      // @ts-ignore
      onQueryStarted: async (chatRoomId, { dispatch, queryFulfilled }) => {
        if (navigator.onLine) {
          try {
            // @ts-ignore
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

    deleteGroupMember: builder.mutation<any, object>({
      query: (data: { chat_room_id: number; user_id: number }) => ({
        url: `chat/user/delete`,
        method: "POST",
        body: data,
      }),
      // @ts-ignore
      onQueryStarted: async (chat_room_id, { dispatch, queryFulfilled }) => {
        if (navigator.onLine) {
          try {
            await queryFulfilled;
          } catch (err) {
            console.error("Failed to delete member:", err);
          }
        } else return;
      },
    }),

    messageReadUpdate: builder.mutation<
      any,
      { chat_room_id: number; chat_id_list: UnreadMsgs }
    >({
      query: (data) => ({
        url: `chat/messages/read`,
        method: "PATCH",
        body: data,
      }),
      // @ts-ignore
      onQueryStarted: async (chat_room_id, { dispatch, queryFulfilled }) => {
        if (navigator.onLine) {
          try {
            await queryFulfilled;
          } catch (err) {
            console.error("Failed to update read status:", err);
          }
        } else return;
      },
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
  useMessageReactMutation,
  useSearchMessagesMutation,
  usePinMessageMutation,
  useDeleteGroupMemberMutation,
  useMessageReadUpdateMutation,
} = chatApi as any;
