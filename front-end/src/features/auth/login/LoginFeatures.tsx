import { Input } from "@/components/ui/input";
import { useInputForm } from "@/hook/useInputForm";
import { useMutateQuery } from "@/hook/useMutateQuery";
import {
  loginSchemas,
  type LoginSchemasDTO,
} from "@/libs/schemas/usersSchemas";

const LoginFeatures = () => {
  const { register, errors, handleSubmit } =
    useInputForm<LoginSchemasDTO>(loginSchemas);

  const { isPending, mutateAsync } = useMutateQuery<LoginSchemasDTO>({
    method: "post",
    endpoint: "/users/auth",
    key: "login",
    schema: loginSchemas,
    navigate: "/",
    isFormData: false,
    set: "setToken",
  });

  const onSubmit = async (data: LoginSchemasDTO) => {
    await mutateAsync(data);
  };

  return (
    <div className="w-full h-screen bg-zinc-100">
      <div className="flex justify-center items-center h-full p-4">
        <div className="border border-r-8 border-b-6 p-2 rounded-md w-full md:w-md shadow">
          <h1 className="text-center font-bold text-4xl my-4">Login Warket</h1>
          <div className="my-2">
            <label htmlFor="email" className="font-semibold">
              Email:
            </label>
            <Input
              id="email"
              {...register("email")}
              type="email"
              placeholder="warket@gmail.com"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="font-semibold">
              Password:
            </label>
            <Input
              id="password"
              {...register("password")}
              type="password"
              placeholder="*********"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button
            disabled={isPending ? true : false}
            onClick={handleSubmit(onSubmit)}
            className="w-full border-r-6 border-b-4 hover:scale-102 cursor-pointer p-2 font-bold text-2xl rounded-md border my-4"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginFeatures;
