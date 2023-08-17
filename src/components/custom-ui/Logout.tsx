import { useEffect } from "react";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import { logOut, setCredentials } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Logout: React.FC = () => {
  const [logout, { isLoading: isLoadingLogin }] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const userData = await logout({}).unwrap();
        console.log("userData", userData);
        dispatch(logOut({}));
        navigate("/login");
      } catch (err) {
        toast.error(err?.data?.message);
      }
    };

      handleLogout()
  },[dispatch, navigate]);
  return <div></div>;
};

export default Logout;
