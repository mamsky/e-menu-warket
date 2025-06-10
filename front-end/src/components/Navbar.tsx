import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Cookies from "js-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <div className="bg-gradient-to-r from-blue-600 via-blue-800 to-blue-500 h-16 text-white">
      <div className="flex h-full justify-between items-center px-12 ">
        <div>
          <h1 className="font-bold text-2xl">Warunk Ketong</h1>
        </div>
        <div className="flex gap-2">
          <Link
            to={"/"}
            className={`${
              pathname == "/" ? "bg-blue-900" : ""
            } border border-b-4 border-r-4 p-2 rounded-md `}
          >
            Dashbord
          </Link>
          <Link
            to={"/menu"}
            className={`${
              pathname == "/menu" ? "bg-blue-900" : ""
            } border border-b-4 border-r-4 p-2 rounded-md `}
          >
            Menu
          </Link>
          <LogoutComponents />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const LogoutComponents = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="border border-b-4 border-r-4 p-2 rounded-md cursor-pointer">
        Logout
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to exit?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer border-b-4 border-r-4 border-black">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            className="cursor-pointer border-b-4 border-r-4 border-black bg-red-500"
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
