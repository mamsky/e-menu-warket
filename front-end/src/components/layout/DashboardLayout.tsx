import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import SkeletonSpinner from "../ui/skeleton-spinner";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { isFetched, isPending, error } = useQuery({
    queryKey: ["auth-check"],
    queryFn: async () => {
      const res = await api.get("/users/check");
      return res.data;
    },
  });

  useEffect(() => {
    if (isAxiosError(error) && error.response?.status === 401) {
      navigate("/");
    }
  }, [error, navigate, isPending]);

  if (isPending) return <SkeletonSpinner />;
  if (isFetched)
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
