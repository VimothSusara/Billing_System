import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import logo from "@/assets/images/logo.png";

import useAuthStore from "@/store/authStore";
import Toast from "@/components/Toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login, loading, clearToast } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const response = await login(data.username, data.password);
    if (response.success) {
      navigate("/dashboard");
    } else {
      toast.error(response.message);
      clearToast();
    }
  };

  return (
    <>
      <div className="flex flex-col mx-auto mt-20 justify-center w-[370px] px-2 pt-0 pb-5 shadow-lg inset-shadow-zinc-200 rounded-md">
        <div className="mx-auto">
          <img className="h-32 w-auto mx-auto" src={logo} alt="Logo" />
          <h2 className="text-center mt-0 text-2xl font-bold text-blue-500">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-5 md:w-72 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div>
              <label
                htmlFor="username"
                className="block text-md font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1.5">
                <input
                  type="text"
                  {...register("username", {
                    required: "Username is required",
                  })}
                  name="username"
                  id="username"
                  placeholder="Username"
                  className={`block w-full rounded-md px-2.5 py-1 text-gray-500 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 ${
                    errors.username
                      ? "focus:outline-red-500"
                      : "focus:outline-blue-600"
                  }`}
                />
                {errors.username && (
                  <span className="text-red-500 text-sm">
                    {errors.username.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-md font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1.5">
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  name="password"
                  id="password"
                  placeholder="Password"
                  className={`block w-full rounded-md px-2.5 py-1 text-gray-500 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 ${
                    errors.password
                      ? "focus:outline-red-500"
                      : "focus:outline-blue-600"
                  }`}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-5">
              <button
                className="w-full flex justify-center py-1.5 text-md font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-all duration-300 ease-in-out cursor-pointer"
                disabled={loading}
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toast />
    </>
  );
};

export default Login;
