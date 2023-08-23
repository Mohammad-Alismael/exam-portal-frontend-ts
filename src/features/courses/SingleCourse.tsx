import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSelector } from "react-redux";
import { selectCourseId, selectTab } from "../sidebar/sidebarSlice";
import {
  useGetCoursesByClassroomIdQuery,
  useGetCoursesQuery,
} from "./coursesApiSlice";
import LoadingSpinner from "../../components/custom-ui/LoadingSpinner";
import Announcement from "../announcements/Announcement";
import { toast } from "react-toastify";
import Participants from "../../components/custom-ui/Participants";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ExamCard from "../../components/custom-ui/cards/ExamCard";
import {selectCurrentUser} from "../auth/authSlice";
import {Avatar, AvatarFallback, AvatarImage} from "../../components/ui/avatar";

function SingleCourse(props) {
  const courseId = useSelector(selectCourseId);
  const {
    data: course,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCoursesByClassroomIdQuery(courseId);
  const user = useSelector(selectCurrentUser);

  toast.error(error);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isSuccess) {
    const { class_name, img_path } = course["data"]["course_info"];
    window.document.title = class_name;
    return (
      <Tabs defaultValue="announcements" className="w-full">
        <TabsList className="grid w-[400px] grid-cols-3 text-black">
          <TabsTrigger className="" value="announcements">
            announcements
          </TabsTrigger>
          <TabsTrigger className="" value="exams">
            exams
          </TabsTrigger>
          <TabsTrigger className="" value="people">
            people
          </TabsTrigger>
        </TabsList>
        <TabsContent className="w-full h-screen" value="announcements">
          <div className="">
            <Card
              className="mt-4 mb-7 rounded-xl h-60 drop-shadow-xl bg-cover bg-center border-none hover:drop-shadow-none cursor-pointer"
              style={{
                backgroundImage: `url(${img_path})`,
              }}
            >
              <CardHeader>
                <CardTitle>{class_name}</CardTitle>
              </CardHeader>
              <div className="inline-flex items-center gap-x-2 px-6 absolute bottom-6">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="bg-yellow-600">CN</AvatarFallback>
                </Avatar>
                <span>username</span>
              </div>
            </Card>
            <div className="px-24 space-y-3">
              <Announcement />
            </div>
          </div>
        </TabsContent>
        <TabsContent className="w-full h-screen" value="exams">
          <div className="flex justify-between items-center py-5">
            <h1 className="text-white text-2xl font-semibold  m-0 capitalize">
              exams
            </h1>
            <div className=" bg-white text-black">
              <Input
                icon={<MagnifyingGlassIcon className="h-5 w-5 text-black" />}
                label="Search"
              />
            </div>
          </div>
          <div className="flex justify-between py-2 px-1 text-md capitalize">
            <span>exam name</span>
            <span>creation date</span>
            <span>{user.role_id === "3" ? 'due date': 'status'}</span>
            <span>{user.role_id === "3" ? 'actions' : 'submitted at'}</span>
          </div>
          <div className="space-y-2.5">
            <ExamCard />
            <ExamCard />
            <ExamCard />
            <ExamCard />
            <ExamCard />
          </div>
        </TabsContent>
        <TabsContent value="people">
          <div className="flex justify-between items-center py-5">
            <h1 className="text-white text-2xl font-semibold  m-0 capitalize">
              classmates
            </h1>
            <div className="bg-white text-black">
              <Input
                className="bg-white text-black"
                icon={<MagnifyingGlassIcon className="h-5 w-5 text-black" />}
                label="Search"
              />
            </div>
          </div>

          <Card className="border-none rounded space-y-2.5">
            <Participants />
            <Participants />
            <Participants />
            <Participants />
          </Card>
        </TabsContent>
      </Tabs>
    );
  }
}

export default SingleCourse;
