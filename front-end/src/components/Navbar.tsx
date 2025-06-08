import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  console.log(pathname);

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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
