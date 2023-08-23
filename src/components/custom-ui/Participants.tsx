import React from "react";
import PropTypes from "prop-types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

Participants.propTypes = {};

function Participants(props) {
  return (
    <div className="rounded flex items-center gap-x-2 px-3 py-1 text-black bg-white ">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback className="bg-yellow-600">CN</AvatarFallback>
      </Avatar>
      <span>username</span>
    </div>
  );
}

export default Participants;
