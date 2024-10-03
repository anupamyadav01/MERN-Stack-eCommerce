import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { LoginContext } from "../App";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(LoginContext);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `http://localhost:9000/api/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);

      if (response.status === 200) {
        setIsLoggedIn(true);
        console.log("User logged in successfully.");
        toast.success("User LoggedIn Successfully", {
          position: "top-right",
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message, {
          position: "top-right",
        });
      } else {
        toast.error("Something went wrong. Please try again.", {
          position: "top-right",
        });
      }

      console.log("User login failed -->", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 mt-1 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 mt-1 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            Login
          </button>
          <div className="mt-4 text-right">
            <Link
              to={"/forgot-password"}
              className="text-sm text-indigo-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
