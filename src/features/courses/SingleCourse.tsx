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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCourseId,
  selectTab,
  setSelectedCourseId,
  setTab,
} from "../sidebar/sidebarSlice";
import {
  useGetCoursesByClassroomIdQuery,
  useGetCoursesQuery,
} from "./coursesApiSlice";
import LoadingSpinner from "../../components/custom-ui/LoadingSpinner";
import { Announcement } from "../announcements/Announcement";
import { toast } from "react-toastify";
import Participants from "../../components/custom-ui/Participants";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ExamCard from "../../components/custom-ui/cards/ExamCard";
import { selectCurrentUser } from "../auth/authSlice";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { ArrowLeftCircle } from "lucide-react";
import { Label } from "../../components/ui/label";
import SingleCourseSkeleton from "./SingleCourseSkeleton";

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
  const dispatch = useDispatch();
  if (isLoading) {
    return <SingleCourseSkeleton />;
  }
  if (isSuccess) {
    const { class_name, img_path, section, classroom_id } =
      course["data"]["course_info"];
    const {username,profile_url} = course["data"]["course_info"]['instructor']
    window.document.title = class_name;
    return (
      <div className="">
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
          <TabsContent className="w-full h-[90vh] overflow-y-auto" value="announcements">
            <Card
              className="mt-4 mb-5 rounded-xl h-60 drop-shadow-xl bg-cover bg-center border-none hover:drop-shadow-none cursor-pointer"
              style={{
                backgroundImage: `url(${img_path})`,
              }}
            >
              <CardHeader>
                <CardTitle>{class_name}</CardTitle>
                <p className="text-slate-500">
                  {section.toUpperCase()} section
                </p>
              </CardHeader>
              {parseInt(user.role_id) === 3 && (
                <Button
                  type="link"
                  className="border-yellow-600 text-yellow-600 float-right absolute top-6 right-6"
                >
                  edit classroom
                </Button>
              )}
              <div className="inline-flex items-center gap-x-2 px-6 absolute bottom-6">
                <Avatar>
                  <AvatarImage src={profile_url} />
                  <AvatarFallback className="bg-yellow-600">CN</AvatarFallback>
                </Avatar>
                <span>{username}</span>
              </div>
            </Card>
            <div className="px-24 space-y-3">
              <Announcement />
              <Announcement />
              <Announcement />
              <Announcement />
              <Announcement />
            </div>
          </TabsContent>
          <TabsContent className="w-full h-screen" value="exams">
            <div className="flex justify-between items-center pt-10 pb-5">
              <div>
                <Label className="capitalize" htmlFor="email">
                  exam name
                </Label>
                <Input
                  id="email"
                  className="text-black bg-white w-[200px]"
                  type="email"
                  placeholder="Email"
                />
              </div>

              {parseInt(user.role_id) === 3 && (
                <Button className="bg-yellow-600 text-black rounded font-semibold capitalize">
                  post exam
                </Button>
              )}
            </div>
            <div className="flex justify-between py-2 px-1 text-md capitalize">
              <span>exam name</span>
              <span>creation date</span>
              <span>{user.role_id === "3" ? "due date" : "status"}</span>
              <span>{user.role_id === "3" ? "actions" : "submitted at"}</span>
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
              {course["data"]["classmates"].map((val, i) => {
                return <Participants data={val} key={i} />;
              })}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }
}

export default SingleCourse;
