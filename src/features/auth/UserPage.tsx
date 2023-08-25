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
  useUploadImageMutation,
} from "./usersApiSlice";
import InputWithDebounce from "../../components/custom-ui/InputWithDebounce";
import LoadingSpinner from "../../components/custom-ui/LoadingSpinner";
import { apiSlice } from "../../app/api/apiSlice";

function UserPage(props) {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, isError, error } = useGetUserInfoQuery(
    user?.username
  );
  const [
    uploadImage,
    { isLoading: uploadImageLoading, isError: uploadImageError },
  ] = useUploadImageMutation();
  const [selectedFile, setSelectedFile] = useState(null);
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
    alert("clicked");
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      uploadImage(formData)
        .unwrap()
        .then((data) => {
          console.log(data);
          handleReset();
          dispatch(
            apiSlice.util.invalidateTags([{ type: "User", id: "USER_INFO" }])
          );
        })
        .catch(console.log);
    }
  };

  const handleReset = () => {
    setSelectedFileName("No file selected");
    setSelectedFile(null);
  };

  if (isLoading) return <LoadingSpinner />;
  console.log('user data' ,data);
  return (
    <div>
      <h1 className="text-white text-2xl font-semibold pb-2 m-0 capitalize">
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
              <div className="inline-flex items-center gap-x-10 px-3">
                {uploadImageLoading ? (
                  <Spinner className="h-20 w-20 text-gray-900/50" />
                ) : (
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      // src={
                      //   data.profile_url
                      //     ? data?.profile_url
                      //     : "https://github.com/shadcn.png"
                      // }
                      src={
                        data.profile_url
                      }
                    />
                    <AvatarFallback className="bg-yellow-600">
                      CN
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
                customHook={useExistsMutation}
                label="username"
                defaultValue={user?.username}
                objectKey="username"
              />
              <InputWithDebounce
                customHook={useExistsMutation}
                label="email"
                defaultValue={data?.email_id}
                objectKey="email_id"
              />
            </CardContent>
            <CardFooter>
              <Button className="bg-yellow-600 rounded text-black">
                save changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent className="mt-5" value="security">
          <Card className="bg-white w-full">
            <CardHeader></CardHeader>
            <CardContent className="grid grid-cols-2 gap-1.5">
              <div className="">
                <Label htmlFor="email">Username</Label>
                <Input type="email" id="email" placeholder="username" />
              </div>
              <div className="">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Email" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-yellow-600 rounded text-black">
                save changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default UserPage;
