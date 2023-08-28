import React from "react";
import PropTypes from "prop-types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";

Participants.propTypes = {};

function Participants({ data }) {
  const { username,profile_url } = data;
  const user = useSelector(selectCurrentUser);

  return (
    <div className="rounded flex items-center gap-x-3 px-3 py-2 text-black bg-white ">
      <Avatar>
        <AvatarImage src={profile_url} />
        <AvatarFallback className="bg-yellow-600">{username.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <span className="text-xl">{username === user?.username ? "me" : username}</span>
    </div>
  );
}

export default Participants;
