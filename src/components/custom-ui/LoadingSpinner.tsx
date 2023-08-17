import { useParams } from "react-router-dom";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="h-screen flex justify-center items-center spinner">
      <img
        className="w-35 aspect-w-1 aspect-h-1 animate-pulse"
        src="/logo.png"
        alt="icon logo"
      />
    </div>
  );
};

export default LoadingSpinner;
