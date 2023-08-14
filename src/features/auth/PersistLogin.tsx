import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, setCredentials } from "./authSlice";
import React, { useEffect, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

const PersistLogin: React.FC = () => {
  const token = useSelector(selectCurrentToken) as string;
  const [refresh, { isLoading }] = useRefreshMutation();
  const [isLoading_, setIsLoading_] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const refreshAccessToken = async () => {
      try {
        const response = await refresh({});
        const data = response?.data; // Adjust this based on the structure of the response
        const { accessToken } = data;
        dispatch(setCredentials({ ...data, user: jwt_decode(accessToken) }));
      } catch (err) {
        toast.error(err?.data?.message);
      } finally {
        isMounted && setIsLoading_(false);
      }
    };

    !token ? refreshAccessToken() : setIsLoading_(false);
    return () => (isMounted = false);
  }, []);

  return (
    <>
      {token ? (
        <Outlet />
      ) : isLoading_ ? (
        <p className="text-white">Loading...</p>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
