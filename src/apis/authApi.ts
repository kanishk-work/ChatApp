import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginDetails, LoginResponse } from "../Types/login";

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
    logIn: builder.mutation<LoginResponse, LoginDetails>({
      query: (loginDetails) => ({
        url: `auth/login`,
        method: "POST",
        body: loginDetails,
      }),
    }),
    searchUsers: builder.query<Users[], string>({
      query: (searchTerm) => `auth/users?search=${searchTerm}`,
    }),
  }),
});

export const { useSearchUsersQuery, useLogInMutation } = authApi as any;
