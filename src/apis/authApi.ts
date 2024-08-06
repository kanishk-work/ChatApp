import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Users {
  id: string;
  name: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_HOST_URL,
    headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` },
  }),
  endpoints: (builder) => ({
    searchUsers: builder.query<Users[], string>({
      query: (searchTerm) => `auth/users?search=${searchTerm}`,
    }),
  }),
});

export const { useSearchUsersQuery } = authApi as any;
