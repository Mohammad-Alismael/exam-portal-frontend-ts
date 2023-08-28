import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "./authSlice";
import { Button, Card, Spinner } from "@material-tailwind/react";
import { CardContent, CardFooter, CardHeader } from "../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import {
  useExistsMutation,
  useGetUserInfoQuery,
  usersApiSlice,
  useUpdatePasswordMutation,
  useUpdateUserInfoMutation,
  useUploadImageMutation,
} from "./usersApiSlice";
import InputWithDebounce from "../../components/custom-ui/InputWithDebounce";
import LoadingSpinner from "../../components/custom-ui/LoadingSpinner";
import { apiSlice } from "../../app/api/apiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ReloadIcon } from "@radix-ui/react-icons";

function UserPage(props) {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isError, error } = useGetUserInfoQuery(
    user?.username
  );
  const [
    uploadImage,
    { isLoading: uploadImageLoading, isError: uploadImageError },
  ] = useUploadImageMutation();
  const [updateUserInfo, { isLoading: isLoadingUpdateUserInfo }] =
    useUpdateUserInfoMutation();
  const [updatePassword, { isLoading: isLoadingUpdatePw }] =
    useUpdatePasswordMutation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [username, setUsername] = useState(data?.username);
  const [email, setEmail] = useState(data?.email_id);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [selectedFileName, setSelectedFileName] = useState("No file selected");
  const allowedFileTypes = ["image/jpeg", "image/gif", "image/png"];
  const maxFileSize = 2 * 1024 * 1024; // 2MB in bytes
  const handleFileSelect = () => {
    // Trigger the file input click event
    document.getElementById("fileInput").click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      if (allowedFileTypes.includes(file.type) && file.size <= maxFileSize) {
        setSelectedFileName(file.name);
        setSelectedFile(file);
        handleImageUpload(file);
      } else {
        setSelectedFileName(
          "Invalid file. Please select a JPG, GIF, or PNG file within 2MB."
        );
        setSelectedFile(null);
      }
    } else {
      setSelectedFileName("No file selected");
      setSelectedFile(null);
    }
  };

  const handleImageUpload = (file) => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      uploadImage(formData)
        .unwrap()
        .then((data) => {
          console.log(data);
          handleReset();
          dispatch(apiSlice.util.invalidateTags(["USER_INFO"]));
        })
        .catch(console.log);
    }
  };

  const handleUpdateUserInfo = () => {
    updateUserInfo({ username, email_id: email })
      .unwrap()
      .then((data) => {
        toast.info(data["message"]["username"]);
        toast.info(data["message"]["email"]);
        (data["message"]["email"] === "email address updated successfully" ||
          data["message"]["username"] === "username updated successfully") &&
          navigate("/login");
      });
  };

  const handleUpdatePassword = () => {
    updatePassword({ current_password: password, new_password: newPassword })
      .unwrap()
      .then((data) => {
        toast.info(data["message"]);
        data["message"] === "updated successfully!" &&
          navigate("/login");
      })
      .catch((data) => {
        console.log(data);
        toast.info(data["data"]["message"]);
      });
  };

  const handleReset = () => {
    setSelectedFileName("No file selected");
    setSelectedFile(null);
  };

  if (isLoading) return <LoadingSpinner />;
  console.log(data);
  return (
    <div>
      <h1 className="text-white text-2xl font-semibold pb-3 m-0 capitalize">
        your personal details
      </h1>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-[400px] grid-cols-2 text-black">
          <TabsTrigger className="" value="account">
            account
          </TabsTrigger>
          <TabsTrigger className="" value="security">
            security
          </TabsTrigger>
        </TabsList>
        <TabsContent className="mt-5" value="account">
          <Card className="bg-white w-full">
            <CardHeader>
              <p className="capitalize text-black font-bold text-xl pb-4">
                Profile Details
              </p>
              <div className="inline-flex items-center gap-x-10 px-3">
                {uploadImageLoading ? (
                  <Spinner className="h-20 w-20 text-gray-900/50" />
                ) : (
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={data.profile_url} />
                    <AvatarFallback className="bg-yellow-600">
                      {user.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="">
                  <div className="space-x-2">
                    <Button
                      className="bg-yellow-600 rounded text-black"
                      onClick={handleFileSelect}
                    >
                      upload new photo
                    </Button>
                    <input
                      id="fileInput"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    <Button onClick={handleReset}>reset</Button>
                  </div>
                  <p className="">{selectedFileName}</p>
                  <span>Allowed JPG, GIF or PNG. Max size of 2 MB</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-1.5">
              <InputWithDebounce
                val={username}
                setValue={setUsername}
                customHook={useExistsMutation}
                label="username"
                defaultValue={user?.username}
                objectKey="username"
              />
              <InputWithDebounce
                val={email}
                setValue={setEmail}
                customHook={useExistsMutation}
                label="email"
                defaultValue={data?.email_id}
                objectKey="email_id"
              />
            </CardContent>
            <CardFooter>
              <Button
                className="bg-yellow-600 rounded text-black"
                onClick={handleUpdateUserInfo}
                disabled={isLoadingUpdateUserInfo}
              >
                {isLoadingUpdateUserInfo ? (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "save changes"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent className="mt-5" value="security">
          <Card className="bg-white w-full">
            <CardHeader className="capitalize text-black font-bold text-xl">
              change password
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-1.5">
              <div className="">
                <Label htmlFor="current_password">current password</Label>
                <Input
                  type="password"
                  id="current_password"
                  placeholder="current password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="">
                <Label htmlFor="new_password">new password</Label>
                <Input
                  type="password"
                  id="new_password"
                  placeholder="new password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="bg-yellow-600 rounded text-black"
                onClick={handleUpdatePassword}
                disabled={isLoadingUpdatePw}
              >
                {isLoadingUpdatePw ? (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "save changes"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default UserPage;
