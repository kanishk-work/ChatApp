import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MessagePayload } from "../Types/message";

export interface Group {
  toUsersList: Array<number>;
  group_name: string;
}

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_HOST_URL,
    headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` },
  }),
  endpoints: (builder) => ({
    createGroup: builder.query<string, Group>({
      query: (body) => ({
        url: `chat/group/join`,
        method: "POST",
        body,
      }),
    }),
    sendMessage: builder.mutation<string, MessagePayload>({
      query: (body) => ({
        url: `chat/send`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateGroupApi, useSendMessageMutation } = chatApi as any;
