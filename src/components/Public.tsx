import { Link } from "react-router-dom";
import logo from "/logo.png";
import { Button } from "./ui/button";

const Public = () => {
  const content = (
    <section className="flex flex-col px-16 py-4">
      <div className="flex justify-between items-center ">
        <div className="flex justify-center items-center gap-5">
          <img className="w-[75px]" src={logo} alt="ExamInstructor Portal" />
          <h1 className="text-4xl capitalize text-white font-bold">
            exam portal
          </h1>
        </div>
        <div>
          <Link to="/login" replace>
            <Button type='button' className='text-yellow-400 rounded border-yellow-400 capitalize'>login</Button>
          </Link>
          <Link to="/signup" replace>
            <Button className='bg-yellow-400 text-black rounded capitalize'>sign up</Button>
          </Link>
        </div>
      </div>
      <div>
        <h1 className="text-4xl capitalize text-white font-bold text-center my-20">
          exam portal is your work OS
        </h1>
      </div>
    </section>
  );
  return content;
};
export default Public;
