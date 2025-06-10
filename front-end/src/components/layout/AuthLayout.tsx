import Cookies from "js-cookie";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

  return <Outlet />;
};

export default AuthLayout;
