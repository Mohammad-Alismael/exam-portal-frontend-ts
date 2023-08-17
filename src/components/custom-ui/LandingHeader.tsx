import logo from "/logo.png";
import { Link } from "react-router-dom";
type PropTypes = {
  type: string;
};

const LandingHeader: React.FC = ({ type }: PropTypes) => {
  return (
    <div className="flex justify-between items-center bg-white px-5 absolute top-0 left-0 right-0">
      <div className="flex justify-center items-center gap-1 md:gap-5">
        <img className="w-1/4 max-w-[75px]" src={logo} alt="ExamInstructor Portal" />
          <h1 className="text-xl md:text-4xl capitalize text-black font-bold">
              exam portal
          </h1>
      </div>
      <div>
        <Link
          className="text-black underline"
          to={type === "auth" ? "/signup" : "/login"}
        >
          {type === "auth"
            ? "Don't have an account?"
            : "Already have an account?"}
        </Link>
      </div>
    </div>
  );
}

export default LandingHeader;
