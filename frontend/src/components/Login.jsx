import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../router/Router";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  useEffect(() => {
    isUserLoggedIn();
  }, [isLoggedIn]);

  const isUserLoggedIn = async () => {
    try {
      const response = await axios.get(
        `http://localhost:10001/api/user/isLoggedIn`,
        {
          withCredentials: true,
        }
      );
      if (response?.status === 200) {
        setTimeout(() => {
          setIsLoggedIn(true);
        }, 3000);
      }
    } catch (error) {
      console.log("Error occurred while getting isLoggedIn", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `http://localhost:10001/api/user/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      console.log("User logged in successfully.");
      toast.success("User LoggedIn Successfully", {
        position: "top-right",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      console.log("Invalid email or password.");
    }
  };
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 mt-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 mt-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
          <div className="mt-4 text-right">
            <Link
              to={"/forgot-password"}
              className="text-sm text-blue-500 hover:underline"
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
