import React from "react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "../../ui/card";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { CardStackIcon } from "@radix-ui/react-icons";
import { COURSES, courses } from "../../../lib/consts";
import {
  setSelectedCourseId,
  setTab,
} from "../../../features/sidebar/sidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
CourseCard.propTypes = {};

function CourseCard({ data }) {
  console.log(data)
  const { class_name, classroom_id, img_path, section, instructor_info } = data;
  const {email,username } = instructor_info
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const handleCourseId = () => {
    dispatch(setTab(COURSES));
    dispatch(setSelectedCourseId(classroom_id));
  };
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card
          onClick={handleCourseId}
          className="rounded-xl h-40 drop-shadow-xl bg-cover bg-center border-none hover:drop-shadow-none cursor-pointer"
          style={{
            backgroundImage: `url(${img_path})`,
          }}
        >
          <CardHeader className="p-3">
            <CardTitle>{class_name}</CardTitle>
            <p className="text-slate-500 text-sm">
              {section.toUpperCase()} section
            </p>
          </CardHeader>
          <div className="inline-flex items-center gap-x-2 px-3 absolute bottom-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-yellow-600">CN</AvatarFallback>
            </Avatar>
            <span>{username}</span>
          </div>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64 text-black">
        {user.role_id === "3" && (
          <ContextMenuCheckboxItem
            onClick={() => alert("copied")}
            className="capitalize"
          >
            copy invitation link
          </ContextMenuCheckboxItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default CourseCard;
