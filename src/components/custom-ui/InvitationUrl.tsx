import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import CourseCard from "./cards/CourseCard";
import {
  useEnrolToClassroomMutation,
  useVerifyInvitationLinkQuery,
} from "../../features/courses/coursesApiSlice";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-toastify";
import { ReloadIcon } from "@radix-ui/react-icons";

function InvitationUrl(props) {
  const { invitationToken } = useParams();
  const navigate = useNavigate();
  const {
    data,
    isLoading: verifyLoading,
    isSuccess,
    isError,
    error,
  } = useVerifyInvitationLinkQuery({ client_id: invitationToken });
  const [enrolToClassroom, { isLoading: enrollLoading }] =
    useEnrolToClassroomMutation();
  const redirect = (url) => {
    navigate(url);
  };
  const handleAcceptBtn = () => {
    const classroom_id = data["classroom_id"];
    enrolToClassroom({ classroom_id })
      .unwrap()
      .then((fulfilled) => {
        toast.info(fulfilled.message);
        navigate("/dashboard", { replace: true });
      })
      .catch((rejected) => console.error(rejected));
  };
  if (verifyLoading) return <LoadingSpinner />;
  if (data?.message) {
    toast.info(data?.message);
  }
  return (
    <AlertDialog open={isSuccess}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="capitalize text-black">
            is this your invited classroom?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <CourseCard data={data} />
        <AlertDialogFooter className="text-black">
          <AlertDialogCancel className="border-yellow-600 rounded">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={enrollLoading}
            className="bg-yellow-600 rounded"
            onClick={handleAcceptBtn}
          >
            {enrollLoading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Continue"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default InvitationUrl;
