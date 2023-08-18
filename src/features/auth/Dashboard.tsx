import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "./authSlice";
import { Link } from "react-router-dom";
import { SidebarWithSearch } from "../sidebar/SidebarWithSearch";
import { selectTab } from "../sidebar/sidebarSlice";
import {courses, SETTINGS} from "../../lib/consts";
import SingleCourse from "../courses/SingleCourse";
import CourseCard from "../../components/custom-ui/cards/CourseCard";

const Dashboard = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const tab = useSelector(selectTab);
  const welcome = user ? `Welcome ${user.username}` : "Welcome!";
    if(tab === SETTINGS){
        return <p>this is settings page</p>
    }
    if (tab === courses){
        return <SingleCourse />
    }
  return (
    <div>
        <div className="bg-white py-3 px-4 rounded">
            <h1 className='text-black text-2xl font-semibold pb-2 m-0 capitalize'>courses</h1>
            <div className="grid grid-cols-4 gap-5">
                <CourseCard courseId='edf33'/>
                <CourseCard courseId='ghffh45'/>
                <CourseCard courseId='gd45t'/>
                <CourseCard courseId='jh67'/>
            </div>
        </div>
    </div>
  );
};
export default Dashboard;
