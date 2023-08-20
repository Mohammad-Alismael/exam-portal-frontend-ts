import { apiSlice } from "../../app/api/apiSlice";
import { createSelector } from "@reduxjs/toolkit";
// transformFormResponse
const initialState = {
  courses: [],
};
export const coursesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => ({
        url: "/classrooms",
        method: "GET",
      }),
      providesTags: (results, error, arg) => [
        { type: "Course", id: "LIST" },
        ...results.data.map((course: Course) => ({
          type: "Course",
          id: course.id,
        })),
      ],
      keepUnusedDataFor: 5,
    }),
    getCoursesByClassroomId: builder.query({
      query: (classroomId) => ({
        url: `/classrooms/${classroomId}`,
        method: "GET",
      }),
      providesTags: (results, error, arg) => [
        { type: "Course", id: results.data.course_info.id },
      ],
      keepUnusedDataFor: 5,
    }),
    addCourse: builder.mutation({
      query: (course) => ({
        url: "/classrooms",
        method: "POST",
        body: course,
      }),
      invalidatesTags: [{ type: "Course", id: "LIST" }],
    }),
    updateCourse: builder.mutation({
      query: ({ courseId }) => ({
        url: "/classrooms",
        method: "PUT",
        body: courseId,
      }),
      invalidatesTags: (results, error, arg) => [
        { type: "Course", id: arg.id },
      ],
    }),
  }),
});
export const {
  useGetCoursesQuery,
  useGetCoursesByClassroomIdQuery,
  useAddCourseMutation,
  useUpdateCourseMutation,
} = coursesApiSlice;

// export const selectCourseResult = coursesApiSlice.endpoints.getCourses.select(
//   {}
// );
//
// const selectCoursesData = createSelector(
//   selectCourseResult,
//   (coursesResult) => coursesResult.data
// );

// export const {
//   selectAll: selectAllCourses,
//   selectById: selectPostById,
//   selectIds: selectPostIds,
// } = coursesApiSlice.getSelectors(
//   (state) => selectCoursesData(state) ?? initialState
// );
