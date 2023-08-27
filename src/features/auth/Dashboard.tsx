import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "./authSlice";
import { selectCourseId, selectTab } from "../sidebar/sidebarSlice";
import { COURSES, EXAM_PAGE, PROFILE, SETTINGS } from "../../lib/consts";
import SingleCourse from "../courses/SingleCourse";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
import { useForm } from "react-hook-form";
import CreateExamPage from "../exams/CreateExamPage";
import UserPage from "./UserPage";
import {
  CourseCard,
  CourseCardSkeleton,
} from "../../components/custom-ui/cards/CourseCard";
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
  const selectImg = () => {};
  switch (tab) {
    case SETTINGS:
      return <p>This is the settings page</p>;
    case PROFILE:
      return <UserPage />;
    case COURSES:
      if (selectedCourseId !== "") {
        return <SingleCourse />;
      }
      break;
    case EXAM_PAGE:
      return <CreateExamPage />;
    default:
      return (
        <TooltipProvider>
          <Tooltip>
            <div>
              <div className="bg-background py-3 px-4 rounded">
                <h1 className="text-white text-2xl font-semibold pb-2 m-0 capitalize">
                  courses
                </h1>
                <div className="grid grid-cols-4 gap-3">
                  {!isLoading &&
                    courses["data"].length &&
                    courses["data"].map((course: Course, i: number) => {
                      return <CourseCard key={course.id} data={course} />;
                    })}
                  {isLoading && new Array(7).fill(null).map((_, i) => (
                      <CourseCardSkeleton key={i} />
                  ))}
                  {!isLoading && !courses["data"].length && <p>you have no classrooms</p>}
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  {parseInt(user.role_id) === 3 && (
                    <div className="flex items-center justify-center h-16 aspect-square bg-yellow-600 absolute bottom-10 right-10 rounded-[50%]">
                      <PlusIcon
                        strokeWidth={2.5}
                        className="cursor-pointer h-8 text-black transition-transform transform hover:rotate-45"
                      />
                    </div>
                  )}
                </DialogTrigger>
                <DialogContent className="bg-white text-black">
                  <DialogHeader>
                    <DialogTitle className="capitalize">
                      create new classroom
                    </DialogTitle>
                    <DialogDescription>
                      Establish an innovative course environment welcoming new
                      students to enrich their learning experience by engaging
                      with your exceptional teaching prowess.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit((e) => consoel.log(e))}
                      className="w-full space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="class_name"
                        render={({ field }) => (
                          <FormItem className="text-black">
                            <FormLabel>Classroom Name</FormLabel>
                            <FormControl>
                              <Input
                                className="rounded"
                                placeholder="classroom name"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="section"
                        render={({ field }) => (
                          <FormItem className="text-black">
                            <FormLabel>Section</FormLabel>
                            <FormControl>
                              <Input
                                className="rounded"
                                placeholder="section"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="link"
                            className="rounded w-full capitalize border-slate-400"
                          >
                            select background image
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white text-black">
                          <DialogHeader>
                            <DialogTitle>Background images</DialogTitle>
                          </DialogHeader>
                          <div className=" grid grid-cols-4 gap-2 md:gap-3 md:grid-cols-12">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((val, index) => (
                              <div
                                className="col-span-4 sm:col-span-4 md:col-span-4"
                                key={index}
                              >
                                <img
                                  onClick={selectImg}
                                  className="w-full h-full"
                                  src={`http://localhost:8080/default-backgrounds/ep_option${val}.png`}
                                  alt={index.toString()}
                                />
                              </div>
                            ))}
                          </div>

                          <DialogFooter>
                            <Button type="submit">Save changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <div>
                        <h3 className="mb-4 text-lg font-medium">
                          Exam Settings
                        </h3>
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="allow_announcements"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                  <FormLabel className="capitalize">
                                    allow announcements
                                  </FormLabel>
                                  <FormDescription>
                                    Let students ask questions/posts on
                                    classroom feed.
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
                            name="allow_comments"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                  <FormLabel className="capitalize">
                                    allow comments
                                  </FormLabel>
                                  <FormDescription>
                                    Let students comment on posts.
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
                      <Button
                        type="submit"
                        className="bg-yellow-600 rounded float-right"
                      >
                        Submit
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </Tooltip>
        </TooltipProvider>
      );
  }
};
export default Dashboard;
