import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/auth",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/users/refresh",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation } = authApiSlice;
