export {};

declare global {
  type Course = {
    id: string;
    classroom_id: string;
    instructor_info: { username: string; email: string };
    class_name: string;
    section: string;
    allow_students_to_announcements: number;
    allow_students_to_comment: number;
    img_path: string;
  };
  type CourseDetails = {
    course_info: {
      id: number;
      classroom_id: string;
      instructor_id: number;
      class_name: string;
      section: string;
      img_path: string;
      allow_students_to_announcements: boolean;
      allow_students_to_comment: boolean;
      createdAt: string;
      updatedAt: string;
      instructor: {
        username: string;
        email: string;
        role_id: string;
      };
    };
    announcements: [];
    classmates: [];
    exams: [];
  };
}
