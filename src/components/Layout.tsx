import {Link, Outlet} from "react-router-dom";
import logo from './logo.png'
const Layout = (props: any) => {
    // const currentRouteName = props.routes[props.routes.length - 1].name;
    return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
