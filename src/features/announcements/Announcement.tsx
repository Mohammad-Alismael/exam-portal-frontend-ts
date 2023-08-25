import React, {useState} from "react";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import './Announcement.css';
function Announcement(props) {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const comments = [
    { id: 1, text: "Great post!" },
    { id: 2, text: "I found this really helpful." },
    // Add more comments here
  ];
  return (
    <div className="bg-white text-black px-4 pt-3 pb-1 rounded">
      <div className="inline-flex w-full gap-x-2 items-start">
        <div className="inline-flex w-full gap-x-2 items-start">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn2.png" />
            <AvatarFallback className="bg-yellow-600">CN</AvatarFallback>
          </Avatar>
          <div className="inline-flex flex-col">
            <p className="text-base font-semibold">
              mhd alismael .
              <span className="text-sm text-slate-400">20 mins ago</span>
            </p>
            <span className="text-sm">student</span>
          </div>
        </div>
      </div>
      <p className="py-2">don't forget to notify me.</p>
      <hr className="my-2 border-blue-gray-50" />
      <div onClick={toggleComments}>
        <span className="text-slate-500">50 comments</span>
      </div>

      {/* Comments section */}
      <div className="mt-2">
        <TransitionGroup component={null}>
          {showComments && (
            <CSSTransition classNames="fade" timeout={300}>
              <div className="space-y-2">
                {comments.map((comment) => (
                  <div key={comment.id} className="py-1 bg-red-400">
                    {comment.text}
                  </div>
                ))}
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    </div>
  );
}

export default Announcement;
