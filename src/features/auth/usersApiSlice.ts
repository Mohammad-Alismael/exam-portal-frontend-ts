import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
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
    exists: builder.mutation({
      query: (body) => ({
        url: "/users/exists",
        method: "POST",
        body,
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
    getUserInfo: builder.query({
      query: (username) => {
        return {
          url: `/users/${username}`,
          method: "GET",
          transformResponse: (response, meta, arg) => {
            console.log("response", response);
            return response;
          },
        };
      },
      providesTags: ["USER_INFO"],
    }),
    uploadImage: builder.mutation({
      query: (imageData) => {
        console.log("imageData", imageData);
        return {
          url: "/users/upload",
          method: "POST",
          body: imageData,
        };
      },
      invalidatesTags: ["USER_INFO"],
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
  useExistsMutation,
  useGetUserInfoQuery,
  useUploadImageMutation,
} = usersApiSlice;
