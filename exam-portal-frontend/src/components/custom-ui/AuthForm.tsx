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
  FormField,
  FormItem,
  FormLabel,
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
type FormValues = {
  username: string;
  password: string;
};
const AuthForm: React.FC = ({ mode }) => {
  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLParagraphElement | null>(null);
  const [user, setUser] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //
  //   try {
  //     const userData = await login({ username: user, password: pwd }).unwrap();
  //     console.log(userData);
  //     dispatch(setCredentials({ ...userData, user }));
  //     setUser("");
  //     setPwd("");
  //     // navigate("/welcome");
  //   } catch (err) {
  //     setErrMsg(err?.data?.message);
  //     if (errRef.current) {
  //       errRef.current.focus();
  //     }
  //   }
  // };

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  const handlePwdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwd(e.target.value);
  };

  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });
  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <div className="bg-transparent flex justify-center items-center h-screen">
      <Card className="w-[350px]  bg-white rounded text-black">
        <CardHeader>
          <CardTitle className="capitalize">
            {mode === "auth" ? "login" : "sign up"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid w-full items-center gap-4">
                {mode !== "forget-password" ? (
                  <div className="flex flex-col space-y-1.5 text-black">
                    <Label htmlFor="name">Username</Label>
                    <Input
                      id="name"
                      className="rounded"
                      placeholder="username"
                    />
                  </div>
                ) : null}
                {mode === "signup" || mode === "forget-password" ? (
                  <div className="flex flex-col space-y-1.5 text-black">
                    <Label htmlFor="name">Email</Label>
                    <Input
                      id="name"
                      className="rounded"
                      placeholder="example@gmail.com"
                    />
                  </div>
                ) : null}
                {mode !== "forget-password" ? (
                  <div className="flex flex-col space-y-1.5 text-black">
                    <Label htmlFor="name">Password</Label>
                    <Input
                      id="name"
                      className="rounded"
                      placeholder="password"
                    />
                  </div>
                ) : null}
                {mode === "signup" ? (
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">User Type</Label>
                    <Select>
                      <SelectTrigger id="framework" className="rounded">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent
                        position="popper"
                        className="bg-white text-black rounded"
                      >
                        <SelectItem value="next">Next.js</SelectItem>
                        <SelectItem value="sveltekit">SvelteKit</SelectItem>
                        <SelectItem value="astro">Astro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ) : null}
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {mode === "auth" ? (
            <Link className="text-black underline" to="/forgotPassword" replace>
              forgot Password?
            </Link>
          ) : null}
          <Button
            className={`bg-yellow-400 text-black rounded capitalize ${
              mode !== "auth" ? "w-full" : ""
            }`}
          >
            submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );

  return (
    <>
      <div className="bg-transparent flex justify-center items-center h-screen">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-1/4 bg-white rounded p-5 space-y-4"
          >
            <h1 className="text-black capitalize font-bold text-2xl">
              {mode === "auth" ? "login" : "sign up"}
            </h1>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="text-black">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="text-black">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            {mode === "signup" ? (
              <>
                <FormLabel className="text-black capitalize">
                  user type
                </FormLabel>
                <Select>
                  <SelectTrigger className="w-full text-black bg-white">
                    <SelectValue placeholder="user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </>
            ) : null}
            <Button
              type="submit"
              className="bg-yellow-400 text-black rounded-xl w-full"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AuthForm;
