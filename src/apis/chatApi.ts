import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  }),
});

export const { useCreateGroupApi} = chatApi as any;
