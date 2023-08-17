import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "./authSlice";
import { Link } from "react-router-dom";
import { SidebarWithSearch } from "../sidebar/SidebarWithSearch";

const Dashboard = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  const welcome = user ? `Welcome ${user.username}!` : "Welcome!";

  return (
    <div className="bg-green-400 w-full h-screen p-5">
      <h1>{welcome}</h1>
      <p>user: {JSON.stringify(user)}</p>
      <p>
        <Link to="/dashboard/courses">Go to the Users List</Link>
      </p>
    </div>
  );
};
export default Dashboard;
