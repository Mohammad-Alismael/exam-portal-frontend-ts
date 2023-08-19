import React from "react";
import { Card, CardHeader, CardTitle } from "../../ui/card";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { CardStackIcon } from "@radix-ui/react-icons";
import {COURSES, courses} from "../../../lib/consts";
import {
  setSelectedCourseId,
  setTab,
} from "../../../features/sidebar/sidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../features/auth/authSlice";
CourseCard.propTypes = {};

function CourseCard({ courseId, name, img }) {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const handleCourseId = () => {
    dispatch(setTab(COURSES));
    dispatch(setSelectedCourseId(courseId));
  };
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card
          onClick={handleCourseId}
          className="rounded-xl h-40 drop-shadow-xl bg-cover bg-center border-none hover:drop-shadow-none cursor-pointer	 "
          style={{
            backgroundImage: `url(${img})`,
          }}
        >
          <CardHeader>
            <CardTitle>{name}</CardTitle>
          </CardHeader>
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
