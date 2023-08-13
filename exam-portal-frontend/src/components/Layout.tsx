import {Link, Outlet} from "react-router-dom";
import logo from '../../public/logo.png'
const Layout = (props: any) => {
    // const currentRouteName = props.routes[props.routes.length - 1].name;
    console.log(props)
    return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
