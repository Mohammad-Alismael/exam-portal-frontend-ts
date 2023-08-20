import React from "react";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Announcement(props) {
  return (
    <div className="bg-white text-black p-2 rounded">
      <div className="inline-flex w-full gap-x-2 items-start">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn2.png" />
          <AvatarFallback className="bg-yellow-600">CN</AvatarFallback>
        </Avatar>
        <div className="inline-flex flex-col">
          <p className="text-base font-semibold">
            mhd alismael .
            <span className="text-sm text-slate-400">20 mins ago</span>
          </p>
          <span className="text-sm">student</span>
        </div>
      </div>
      <p className="py-2">don't foget to notify me.</p>
      <hr className="my-2 border-blue-gray-50" />
      <div>
        <span className="text-slate-500">50 comments</span>
      </div>
    </div>
  );
}

export default Announcement;
