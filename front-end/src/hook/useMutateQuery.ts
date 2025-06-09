import { api } from "@/lib/api";
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import { isAxiosError } from "axios";
import Cookies from "js-cookie";
import type { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { ZodType } from "zod";

type HTTPMethod = "post" | "put" | "patch" | "delete";
type UseMutateProps<T extends FieldValues> = {
  key: string;
  schema: ZodType<T>;
  endpoint: string;
  navigate?: string;
  method: HTTPMethod;
  isFormData?: boolean;
  invalidate?: string;
  set?: "setToken" | "setUsers";
};

export const useMutateQuery = <T extends FieldValues>({
  key,
  schema,
  endpoint,
  navigate,
  set,
  method,
  invalidate,
  isFormData = false,
}: UseMutateProps<T>): UseMutationResult<T, unknown, T> => {
  const nav = useNavigate();
  const queryClient = useQueryClient();
  return useMutation<T, Error, T>({
    mutationKey: [key],
    mutationFn: async (data: T) => {
      const parsed = schema.safeParse(data);
      if (!parsed.success) {
        throw new Error("Validation failed");
      }

      const payload = isFormData
        ? (() => {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
              if (value instanceof FileList) {
                Array.from(value).forEach((file) => {
                  formData.append(key, file);
                });
              } else if (value instanceof File) {
                formData.append(key, value);
              } else {
                formData.append(key, String(value));
              }
            });
            return formData;
          })()
        : data;

      const headers = isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" };

      if (!(method in api)) {
        throw new Error(`Invalid HTTP method: ${method}`);
      }

      let res;

      if (method === "delete") {
        // delete tidak menerima body
        res = await api.delete(endpoint, { headers });
      } else {
        // post, put, patch menerima body
        res = await api[method](endpoint, payload, {
          headers,
        });
      }

      return res.data;
    },
    onSuccess: (res) => {
      if (set == "setToken") {
        Cookies.set("token", res.token);
      }
      toast.success(res.message ?? "Success");
      if (invalidate) {
        queryClient.invalidateQueries({ queryKey: [invalidate] });
      }
      if (navigate) {
        nav(navigate);
      }
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        toast.error(err?.response?.data?.message ?? "Something went wrong");
      } else {
        toast.error("Unknown error");
      }
    },
  });
};
