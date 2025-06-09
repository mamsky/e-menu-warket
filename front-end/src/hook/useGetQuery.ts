import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

type UseQueryProps = {
  key: string;
  query: string;
};

export const useGetQuery = <T>({ key, query }: UseQueryProps) => {
  return useQuery<{ message: string }, Error, T>({
    queryKey: [key],
    queryFn: async () => {
      const res = await api.get(query);
      return res.data.data;
    },
  });
};
