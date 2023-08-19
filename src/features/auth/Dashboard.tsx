import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "./authSlice";
import {selectCourseId, selectTab} from "../sidebar/sidebarSlice";
import {COURSES, SETTINGS} from "../../lib/consts";
import SingleCourse from "../courses/SingleCourse";
import CourseCard from "../../components/custom-ui/cards/CourseCard";
import { useGetCoursesQuery } from "../courses/coursesApiSlice";
import { Course } from "../../types/global";
import LoadingSpinner from "../../components/custom-ui/LoadingSpinner";

const Dashboard = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const tab = useSelector(selectTab);
  const selectedCourseId = useSelector(selectCourseId)
  const {
    data: courses,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCoursesQuery();
  if (tab === SETTINGS) {
    return <p>this is settings page</p>;
  }
  if (tab === COURSES && selectedCourseId !== '') {
    return <SingleCourse />;
  }
  if (isLoading) {
    return <LoadingSpinner />;
  } else {
    console.log("course", courses["data"]);
    return (
      <div>
        <div className="bg-white py-3 px-4 rounded">
          <h1 className="text-black text-2xl font-semibold pb-2 m-0 capitalize">
            courses
          </h1>
          <div className="grid grid-cols-4 gap-5">
            {courses["data"].map((course: Course, i: number) => {
              return (
                <CourseCard
                  key={course.id}
                  courseId={course.classroom_id}
                  name={course.class_name}
                  img={course.img_path}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};
export default Dashboard;
