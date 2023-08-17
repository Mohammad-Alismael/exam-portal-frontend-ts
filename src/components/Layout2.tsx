import { Outlet } from "react-router-dom";
import { SidebarWithSearch } from "../features/sidebar/SidebarWithSearch";

const Layout2 = () => {
  return (
    <div className="inline-block w-screen">
      <SidebarWithSearch />
      <div className="bg-red-400 float-left w-[80%]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout2;
