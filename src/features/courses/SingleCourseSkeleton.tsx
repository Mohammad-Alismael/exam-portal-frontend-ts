import React from "react";
import { Skeleton } from "../../components/ui/skeleton";
import { Card, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {AnnouncementSkeleton} from "../announcements/Announcement";

function SingleCourseSkeleton(props) {
  return (
    <div>
      <Skeleton className="h-10 w-[340px] bg-gray-300" />
      <Card className="mt-4 mb-5 rounded-xl h-60 drop-shadow-xl bg-white bg-center border-none hover:drop-shadow-none cursor-pointer">
        <CardHeader>
          <Skeleton className="mt-4 mb-5 h-5 w-[200px] bg-gray-300" />
          <Skeleton className="mt-4 mb-5 h-5 w-[50px] bg-gray-300" />
        </CardHeader>
        <Skeleton className="float-right absolute top-6 right-6 w-[100px] bg-gray-300" />
        <div className="inline-flex items-center gap-x-2 px-6 absolute bottom-6">
          <Skeleton className="h-12 w-12 rounded-full  bg-gray-300" />
          <Skeleton className="h-4 w-[70px] bg-gray-300" />
        </div>
      </Card>
      <div className="px-24 space-y-3">
          <AnnouncementSkeleton />
          <AnnouncementSkeleton />
          <AnnouncementSkeleton />
      </div>
    </div>
  );
}

export default SingleCourseSkeleton;
