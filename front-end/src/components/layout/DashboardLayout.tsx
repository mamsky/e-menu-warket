import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-4">
        <Outlet />
      </div>
    </>
  );
};

export default DashboardLayout;
