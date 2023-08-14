import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/authSlice";
import { Link } from "react-router-dom";

import { useLoginMutation } from "@/features/auth/authApiSlice.ts";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {  toast } from 'react-toastify';
import { ReloadIcon } from "@radix-ui/react-icons"


type FormValues = {
  username: string;
  email: string;
  password: string;
  userType: number;
};
const AuthForm: React.FC = ({ mode }) => {
  const [user, setUser] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      userType: 0,
    },
    mode: "onChange",
  });
  const onSubmit = async (data: FormValues) => {


    try {
      const userData = await login({username: data.username, password: data.password}).unwrap();
      console.log('userData', userData);
      console.log('user', user);
      dispatch(setCredentials({...userData, user}));
      form.reset()
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.data?.message)
    }
  };

  return (
    <div className="bg-transparent flex justify-center items-center h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="lg:w-1/4 w-[300px] bg-white rounded p-5 space-y-4"
        >
          <h1 className="text-black capitalize font-bold text-2xl">
            {mode === "auth" && "login"}
            {mode === "signup" && "sign up"}
            {mode === "forget-password" && "forget password"}
          </h1>
          {mode !== "forget-password" && (
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
          {(mode === "signup" || mode === "forget-password") && (
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
          {mode !== "forget-password" && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="text-black">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                        type='password'
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
                        <SelectValue placeholder="Select user type" />
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
              disabled={isLoading}
            >
              { isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;
