import React from "react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "../../ui/card";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { COURSES } from "../../../lib/consts";
import {
  setSelectedCourseId,
  setTab,
} from "../../../features/sidebar/sidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {useGenerateInvitationLinkMutation} from "../../../features/courses/coursesApiSlice";
import useClipboard from "react-hook-clipboard";
import {toast} from "react-toastify";


function CourseCard({ data }) {
  const { class_name, classroom_id, img_path, section, instructor_info } = data;
  const {email,username } = instructor_info
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [clipboard, copyToClipboard] = useClipboard();

  const [generateInvitationLink, {isLoading}] = useGenerateInvitationLinkMutation()

  const handleCourseId = () => {
    dispatch(setTab(COURSES));
    dispatch(setSelectedCourseId(classroom_id));
  };
  const handleInvitationLink = () => {
    generateInvitationLink(classroom_id).unwrap().then((data)=> {
      console.log(data)
      if (data['extended']){
        toast.info("inactivation token has been extended");
      }
      copyToClipboard(
          window.location.origin + "/invitation/" + data['clientId']
      );
      toast.info("copied to clipboard");
    }).catch(console.log)
  }
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card
          onClick={handleCourseId}
          className={`rounded-xl h-40 drop-shadow-xl bg-cover bg-center border-none hover:drop-shadow-none ${isLoading ? 'cursor-wait' : 'cursor-pointer'}`}
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
            onClick={handleInvitationLink}
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
