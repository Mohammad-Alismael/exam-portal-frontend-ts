import  { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";

import {
  useForgotPasswordMutation,
  useLoginMutation,
  useResetPasswordMutation,
  useSignupMutation,
} from "../../features/auth/authApiSlice";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ReloadIcon } from "@radix-ui/react-icons";
import { getUserRoleIdFromSelect } from "../../lib/utils";
type PropTypes = {
  mode: "auth" | "signup" | "forgot" | "reset";
};

type FormValues = {
  username: string;
  email: string;
  password: string;
  userType: string;
};
const AuthForm: React.FC = ({ mode }: PropTypes) => {
  const { resetToken } = useParams();
  const [user, setUser] = useState<string>("");
  const navigate = useNavigate();

  const [login, { isLoading: isLoadingLogin }] = useLoginMutation();
  const [signup, { isLoading: isLoadingSignup }] = useSignupMutation();
  const [forgotPassword, { isLoading: isLoadingForgotPassword }] =
    useForgotPasswordMutation();
  const [resetPassword, { isLoading: isLoadingResetPassword }] =
    useResetPasswordMutation();
  const dispatch = useDispatch();

  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      userType: "",
    },
    mode: "onChange",
  });
  const onSubmitLogin = async (data: FormValues) => {
    try {
      const userData = await login({
        username: data.username,
        password: data.password,
      }).unwrap();
      console.log("userData", userData);
      console.log("user", user);
      dispatch(setCredentials({ ...userData, user }));
      form.reset();
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };
  const onSubmitSignup = async (data: FormValues) => {
    try {
      // { username, password, email_id, role_id }
      const { username, email, password, userType } = data;
      const res = await signup({
        username,
        password,
        email_id: email,
        role_id: getUserRoleIdFromSelect(userType),
      }).unwrap();
      console.log("res", res);
      toast.info(res?.message);
      form.reset();
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };
  const onSubmitForgot = async (data: FormValues) => {
    try {
      // {  email_id }
      const { email } = data;
      const res = await forgotPassword({
        email_id: email,
      }).unwrap();
      console.log("res", res);
      toast.info(res?.message);
      form.reset();
      // navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };
  const onSubmitReset = async (data: FormValues) => {
    try {
      // { reset_token, new_password }
      const { password } = data;
      const res = await resetPassword({
        reset_token: resetToken,
        new_password: password,
      }).unwrap();
      console.log("res", res);
      toast.info(res?.message);
      form.reset();
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  const onSubmit = () => {
    switch (mode) {
      case "auth":
        return onSubmitLogin;
      case "signup":
        return onSubmitSignup;
      case "forgot":
        return onSubmitForgot;
      case "reset":
        return onSubmitReset;
    }
  };
  const isSpinnerLoading =
    isLoadingLogin ||
    isLoadingSignup ||
    isLoadingResetPassword ||
    isLoadingForgotPassword;
  return (
    <div className="bg-transparent flex justify-center items-center h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit())}
          className="lg:w-1/4 w-[300px] bg-white rounded p-5 space-y-4"
        >
          <h1 data-testid='form-header' className="text-black capitalize font-bold text-2xl">
            {mode === "auth" && "login"}
            {mode === "signup" && "sign up"}
            {mode === "forgot" && "forget password"}
            {mode === "reset" && "reset password"}
          </h1>
          {(mode === "auth" || mode === "signup") && (
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="text-black">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded"
                        placeholder="username"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
          {(mode === "signup" || mode === "forgot") && (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="text-black">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded"
                      placeholder="example@gmail.com"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          {mode !== "forgot" && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="text-black">
                  <FormLabel>
                    {mode === "reset" ? "New password" : "Password"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="rounded"
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          {mode === "signup" && (
            <FormField
              control={form.control}
              name="userType"
              render={({ field }) => (
                <FormItem className="text-black">
                  <FormLabel>User Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="rounded">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white text-black rounded">
                      <SelectItem value="undergraduate">
                        Undergraduate
                      </SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                      <SelectItem value="instructor">Instructor</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <div className="flex justify-between items-center">
            {mode === "auth" && (
              <Link
                className="text-black underline"
                to="/forgotPassword"
                replace
              >
                forgot Password?
              </Link>
            )}
            <Button
              type="submit"
              className={`bg-yellow-400 text-black rounded capitalize hover:bg-yellow-200 ${
                mode !== "auth" ? "w-full" : ""
              }`}
              disabled={isSpinnerLoading}
            >
              {isSpinnerLoading ? (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;
