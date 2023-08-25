import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { CardContent } from "../../../components/ui/card";

Settings.propTypes = {};

function Settings({ activeStep }) {
  return (
    <div className="w-[1050px] bg-red-400">
      <Typography variant="h6" color={activeStep === 0 ? "blue-gray" : "gray"}>
        {"Settings"}
      </Typography>
      <CardContent className="text-black grid grid-cols-2 gap-1.5">
        <div className="">
          <Label htmlFor="email">Username</Label>
          <Input type="email" id="email" placeholder="username" />
        </div>
        <div className="">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
      </CardContent>
    </div>
  );
}

export default Settings;
