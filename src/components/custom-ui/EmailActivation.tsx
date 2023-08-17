import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useActivateEmailMutation } from "../../features/auth/authApiSlice";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-toastify";

const EmailActivation: React.FC = () => {
  const { emailToken } = useParams();
  const [activateEmail, { isLoading, isSuccess, isError, error }] =
    useActivateEmailMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await activateEmail({
          email_token: emailToken,
        }).unwrap();
        console.log(res)
        toast.success(res?.message)

      } catch (err) {
        toast.error(err?.data?.message);
      }finally {
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <LoadingSpinner />;
  return (
      <LoadingSpinner />
  );
};

export default EmailActivation;
