import { Link } from "react-router-dom";
import logo from "/logo.png";
import { Button } from "./ui/button";

const Public = () => {
  const content = (
    <section className="public">
      <div className="flex justify-between items-center px-5 absolute top-0 left-0 right-0">
        <div className="flex justify-center items-center gap-5">
          <img className="w-[75px]" src={logo} alt="ExamInstructor Portal" />
          <h1 className="text-4xl capitalize text-white font-bold">
            exam portal
          </h1>
        </div>
        <div>
          <Link to="/login" replace>
            login
          </Link>
          <Link to="/signup" replace>
            sign up
          </Link>
        </div>
      </div>
    </section>
  );
  return content;
};
export default Public;
