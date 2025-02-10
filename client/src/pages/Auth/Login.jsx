import { useState, useRef } from "react";
import { Flip, ToastContainer, toast } from "react-toastify";
import logo from "@/assets/images/logo.png";

import useAuthStore from "@/store/authStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const { login, loading, clearToast } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      toast.error("Username is required");
      nameRef.current?.focus();
      return;
    }

    if (!password) {
      toast.error("Password is required");
      passwordRef.current?.focus();
      return;
    }

    const result = await login(username, password);
    if (result.success) {
      navigate("/dashboard");
    } else {
      toast.error(result.message);
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
          <form className="space-y-2">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1.5">
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  ref={nameRef}
                  placeholder="Username"
                  className="block w-full rounded-md px-2.5 py-1 text-gray-500 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 "
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1.5">
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  ref={passwordRef}
                  placeholder="Password"
                  className="block w-full rounded-md px-2.5 py-1 text-gray-500 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
                />
              </div>
            </div>
            <div className="mt-5">
              <button
                className="w-full flex justify-center py-1.5 text-md font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-all duration-300 ease-in-out cursor-pointer"
                disabled={loading}
                onClick={handleSubmit}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose="2000"
        theme="dark"
        transition={Flip}
      />
    </>
  );
};

export default Login;
