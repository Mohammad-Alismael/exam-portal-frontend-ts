import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./authSlice";
import { Button, Card } from "@material-tailwind/react";
import { CardContent, CardFooter, CardHeader } from "../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";

UserPage.propTypes = {};

function UserPage(props) {
  const user = useSelector(selectCurrentUser);
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
                <Avatar className="h-20 w-20">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="bg-yellow-600">CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="space-x-2">
                    <Button className="bg-yellow-600 rounded text-black">
                      upload new photo
                    </Button>
                    <Button disabled={true}>reset</Button>
                  </div>

                  <span>Allowed JPG, GIF or PNG. Max size of 2 MB</span>
                </div>
              </div>
            </CardHeader>
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
        <TabsContent className="mt-5" value="security">
          <Card className="bg-white w-full">
            <CardHeader>
            </CardHeader>
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
