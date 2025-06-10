import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

type UseQueryProps = {
  key: string;
  query: string;
};

export const useGetQuery = <T>({ key, query }: UseQueryProps) => {
  const navigate = useNavigate();
  return useQuery<{ message: string }, Error, T>({
    queryKey: [key],
    queryFn: async () => {
      try {
        const res = await api.get(query);
        return res.data.data;
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.status == 401) {
            navigate("/login");
          }
        }
      }
    },
  });
};
