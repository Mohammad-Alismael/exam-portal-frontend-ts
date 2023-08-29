import { apiSlice } from "../../app/api/apiSlice";
import { createSelector } from "@reduxjs/toolkit";
// transformFormResponse

export const coursesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => ({
        url: "/classrooms",
        method: "GET",
        transformResponse: (response, meta, arg) => {
          console.log("response", response);
          return response;
        },
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
      query: (course) => {
        console.log('course',course)
        return {
          url: "/classrooms/v2",
          method: "POST",
          body: course,
        }
      },
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
    generateInvitationLink: builder.mutation({
      query: (classroom_id) => {
        console.log("courseId", classroom_id);
        return {
          url: "/classrooms/generate-invitation-link",
          method: "POST",
          body: {courseId: classroom_id},
        };
      },
      transformResponse: (response: { data }, meta, arg) => response.data,
    }),
    enrolToClassroom: builder.mutation({
      query: (body) => ({
        url: "/classrooms/enroll",
        method: "POST",
        body: body,
      }),
    }),
    verifyInvitationLink: builder.query({
      query: (body) => ({
        url: "/classrooms/verify-invitation-link",
        method: "POST",
        body, // client_id
      }),
      transformResponse: (response: { data }, meta, arg) => response.data,
    }),
  }),
});
export const {
  useGetCoursesQuery,
  useGetCoursesByClassroomIdQuery,
  useAddCourseMutation,
  useUpdateCourseMutation,
  useGenerateInvitationLinkMutation,
  useEnrolToClassroomMutation,
  useVerifyInvitationLinkQuery,
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
