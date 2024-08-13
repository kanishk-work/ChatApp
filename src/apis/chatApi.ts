import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ChatRoom } from "../Types/joinGroup";

export interface Group {
  toUsersList: number[];
  group_name: string;
}


export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_HOST_URL,
    headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` },
  }),
  endpoints: (builder) => ({
    createGroup: builder.mutation<ChatRoom, Group>({
      query: (body) => ({
        url: `chat/group/join`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateGroupMutation } = chatApi as any;
