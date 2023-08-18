import React from "react";
import { Card, CardHeader, CardTitle } from "../../ui/card";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { CardStackIcon } from "@radix-ui/react-icons";
import { courses } from "../../../lib/consts";
import {
  setSelectedCourseId,
  setTab,
} from "../../../features/sidebar/sidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../features/auth/authSlice";
CourseCard.propTypes = {};

function CourseCard({ courseId }) {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const handleCourseId = () => {
    dispatch(setTab(courses));
    dispatch(setSelectedCourseId(courseId));
  };
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card
          onClick={handleCourseId}
          className="rounded-xl h-40 drop-shadow-xl bg-cover bg-center border-none hover:drop-shadow-none cursor-pointer	 "
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/128234/pexels-photo-128234.jpeg?cs=srgb&dl=pexels-etha-128234.jpg&fm=jpg')",
          }}
        >
          <CardHeader>
            <CardTitle>CS101</CardTitle>
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
