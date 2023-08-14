import { apiSlice } from "../../app/api/apiSlice";

export const coursesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => ({
        url: "/classrooms",
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    addCourse: builder.mutation({
      query: (course) => ({
        url: "/classrooms",
        method: "POST",
        body: course,
      }),
    }),
    updateCourse: builder.mutation({
      query: ({ courseId }) => ({
        url: "/classrooms",
        method: "PUT",
        body: courseId,
      }),
    }),
  }),
});
export const {
  useGetCoursesQuery,
  useAddCourseMutation,
  useUpdateCourseMutation,
} = coursesApiSlice;
