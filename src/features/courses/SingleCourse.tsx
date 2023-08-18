import React from "react";
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
import {useSelector} from "react-redux";
import {selectCourseId, selectTab} from "../sidebar/sidebarSlice";

function SingleCourse(props) {
    const courseId = useSelector(selectCourseId);
  return (
    <Tabs defaultValue="announcements" className="w-full">
      <TabsList className="grid w-[400px] grid-cols-3 text-yellow-400">
        <TabsTrigger className='hover:bg-violet-700' value="announcements">Announcements</TabsTrigger>
        <TabsTrigger value="exams">exams</TabsTrigger>
        <TabsTrigger value="people">people</TabsTrigger>
      </TabsList>
      <TabsContent className='w-full h-screen' value="announcements">
        <div>
          this is for announcements {courseId}
        </div>
      </TabsContent>
      <TabsContent className='w-full h-screen' value="exams">
        <div>
          this is for exams
        </div>
      </TabsContent>
      <TabsContent className='w-full h-screen' value="people">
          <div>
              this is for people
          </div>
      </TabsContent>
    </Tabs>
  );
}

export default SingleCourse;
