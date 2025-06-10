import AuthLayout from "@/components/layout/AuthLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardPages from "@/pages/DashboardPages";
import LoginPages from "@/pages/LoginPages";
import MenuPages from "@/pages/MenuPages";
import NotFound from "@/pages/NotFound";
import OrderPages from "@/pages/OrderPages";
import RegisterPages from "@/pages/RegisterPages";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    Component: DashboardLayout,
    children: [
      { path: "/", Component: DashboardPages },
      { path: "/menu", Component: MenuPages },
    ],
  },
  {
    path: "/orders/:id",
    Component: OrderPages,
  },
  {
    Component: AuthLayout,
    children: [
      { path: "/register", Component: RegisterPages },
      { path: "/login", Component: LoginPages },
    ],
  },
  { path: "*", Component: NotFound },
]);
