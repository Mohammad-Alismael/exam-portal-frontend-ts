import logo from "/logo.png";
import { Link } from "react-router-dom";
type PropTypes = {
  type: string;
};
function LandingHeader(props: PropTypes) {
  return (
    <div className="flex justify-between items-center bg-white px-5 absolute top-0 left-0 right-0">
      <div className="flex justify-center items-center gap-5">
        <img className="w-[75px]" src={logo} alt="ExamInstructor Portal" />
        <h1 className="text-4xl capitalize text-black font-bold">
          exam portal
        </h1>
      </div>
      <div>
        <Link
          className="text-black underline"
          to={props.type === "auth" ? "/signup" : "/login"}
        >
          {props.type === "auth"
            ? "Don't have an account?"
            : "Already have an account?"}
        </Link>
      </div>
    </div>
  );
}

export default LandingHeader;
