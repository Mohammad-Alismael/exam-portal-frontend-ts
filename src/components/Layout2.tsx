import { Outlet } from "react-router-dom";
import { SidebarWithSearch } from "../features/sidebar/SidebarWithSearch";

const Layout2 = () => {
  return (
    <div className="inline-block w-screen">
      <SidebarWithSearch />
      <div className="float-left w-4/5 h-screen p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout2;
