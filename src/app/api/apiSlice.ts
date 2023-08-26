import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";
import { usersApiSlice } from "../../features/auth/usersApiSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080',
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const token = api.getState().auth.token;
  if (result?.error?.status === 403) {
    const refreshResult = await baseQuery("/users/refresh", api, extraOptions);
    console.log("refreshResult", refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Logout if refresh fails
      api.dispatch(logOut({}));
    }
  }

  return result;
};

export const apiSlice = createApi({
  tagTypes: ["USER_INFO", "Course"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
