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
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/users/create",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    forgotPassword: builder.mutation({
      query: (credentials) => ({
        url: "/users/password/forget",
        method: "POST",
        body: { ...credentials }, // {email_id}
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/users/password/reset",
        method: "POST",
        body: { ...body }, // { reset_token, new_password }
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/users/refresh",
        method: "POST",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
    }),
    activateEmail: builder.mutation({
      query: (body) => ({
        url: "/users/activate",
        method: "POST",
        body: { ...body },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshMutation,
  useSignupMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useActivateEmailMutation,
  useLogoutMutation,
} = authApiSlice;
