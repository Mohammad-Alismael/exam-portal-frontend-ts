import { useLocation, Navigate, Outlet } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentToken, setCredentials} from "./authSlice";
import React, {useEffect, useState} from "react";
import {useRefreshMutation} from "./usersApiSlice";
import {toast} from "react-toastify";
import jwt_decode from "jwt-decode";

const RequireAuth: React.FC = () => {
    const token = useSelector(selectCurrentToken) as string;
    const location = useLocation();
    useEffect(()=> {
        console.log('this is from RequireAuth.tsx')
    })
    if (token) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
};

export default RequireAuth;
