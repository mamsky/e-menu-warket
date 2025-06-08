import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full h-screen">
      <div className="flex justify-center items-center h-full flex-col font-bold">
        <h1 className="text-6xl my-4">404 Not Found</h1>
        <Link to={"/"} className="text-blue-500 p-2 border rounded-md">
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
