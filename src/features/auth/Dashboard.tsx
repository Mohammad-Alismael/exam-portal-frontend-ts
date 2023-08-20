import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "./authSlice";
import { selectCourseId, selectTab } from "../sidebar/sidebarSlice";
import { COURSES, SETTINGS } from "../../lib/consts";
import SingleCourse from "../courses/SingleCourse";
import CourseCard from "../../components/custom-ui/cards/CourseCard";
import { useGetCoursesQuery } from "../courses/coursesApiSlice";
import { Course } from "../../types/global";
import LoadingSpinner from "../../components/custom-ui/LoadingSpinner";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import React from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
const Dashboard = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const tab = useSelector(selectTab);
  const selectedCourseId = useSelector(selectCourseId);
  const form = useForm();
  const {
    data: courses,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCoursesQuery();
  if (tab === SETTINGS) {
    return <p>this is settings page</p>;
  }
  if (tab === COURSES && selectedCourseId !== "") {
    return <SingleCourse />;
  }
  if (isLoading) {
    return <LoadingSpinner />;
  } else {
    console.log("course", courses["data"]);
    return (
      <TooltipProvider>
        <Tooltip>
          <div>
            <div className="bg-background py-3 px-4 rounded">
              <h1 className="text-white text-2xl font-semibold pb-2 m-0 capitalize">
                courses
              </h1>
              <div className="grid grid-cols-4 gap-3">
                {courses["data"].map((course: Course, i: number) => {
                  return <CourseCard key={course.id} data={course} />;
                })}
              </div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-center h-16 aspect-square bg-yellow-600 absolute bottom-10 right-10 rounded-[50%]">
                    <PlusIcon
                      strokeWidth={2.5}
                      className="cursor-pointer h-8 text-black transition-transform transform hover:rotate-45"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-white text-black">
                  <p>Add new classroom</p>
                </TooltipContent>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded bg-white text-black">
                <AlertDialogHeader>
                  <AlertDialogTitle className="cap">
                    create new classroom
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="class_name">class name</Label>
                  <Input
                    type="email"
                    id="class_name"
                    placeholder="class name"
                  />
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit((e)=> (consoel.log(e)))}
                    className="w-full space-y-6"
                  >
                    <div>
                      <h3 className="mb-4 text-lg font-medium">
                        Exam Settings
                      </h3>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="marketing_emails"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel>allow announcements</FormLabel>
                                <FormDescription>
                                  Receive emails about new products, features,
                                  and more.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="security_emails"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel>allow comments</FormLabel>
                                <FormDescription>
                                  Receive emails about your account security.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  aria-readonly
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
                <AlertDialogFooter>
                  <AlertDialogCancel className="border-yellow-600 rounded">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction className="bg-yellow-600 rounded">
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </Tooltip>
      </TooltipProvider>
    );
  }
};
export default Dashboard;
