import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import AuthForm from "./components/custom-ui/AuthForm.tsx";
import RequireAuth from "./features/auth/RequireAuth.tsx";
import Dashboard from "./features/auth/Dashboard.tsx";
import Public from "./components/Public.tsx";
import CoursesList from "./features/courses/CoursesList.tsx";
import Layout2 from "./components/Layout2.tsx";
import LandingHeader from "@/components/custom-ui/LandingHeader.tsx";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./features/auth/authSlice";
import PersistLogin from "./features/auth/PersistLogin";
import EmailActivation from "./components/custom-ui/EmailActivation";
import Logout from "./components/custom-ui/Logout";
import InvitationUrl from "./components/custom-ui/InvitationUrl";
function App() {
  const token = useSelector(selectCurrentToken) as string;

  useEffect(() => {
    console.log("dam2! this is from app.tsx");
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route
          path="login"
          element={
            <>
              <LandingHeader type="auth" />
              <AuthForm mode="auth" />
            </>
          }
        />
        <Route
          path="signup"
          element={
            <>
              <LandingHeader type="signup" />
              <AuthForm mode="signup" />
            </>
          }
        />
        <Route
          path="forgotPassword"
          element={
            <>
              <LandingHeader type="auth" />
              <AuthForm mode="forgot" />
            </>
          }
        />
        <Route
          path="resetPassword/:resetToken"
          element={
            <>
              <LandingHeader type="auth" />
              <AuthForm mode="reset" />
            </>
          }
        />
        <Route path="activation/:emailToken" element={<EmailActivation />} />

        <Route path="logout" element={<Logout />} />

        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route
              path="invitation/:invitationToken"
              element={<InvitationUrl />}
            />
            <Route path="/dashboard" element={<Layout2 />}>
              <Route index element={<Dashboard />} />
              <Route path="courses" element={<CoursesList />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
