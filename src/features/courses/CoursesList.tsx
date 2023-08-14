import { useGetCoursesQuery } from "./coursesApiSlice";
import { Link } from "react-router-dom";

const CoursesList = () => {
  const {
    data: courses,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCoursesQuery();

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = (
      <section className="users">
        <h1>Users List</h1>
        <ul>
          {courses['data'].map((course: any, i: any) => {
            return <li key={i}>{course?.class_name}</li>;
          })}
        </ul>
        <Link to="/dashboard">Back to Welcome</Link>
      </section>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};
export default CoursesList;
