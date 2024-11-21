/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateLoginState } from "../../redux/slices/userSlice";
import axiosInstance from "../../axiosCongig";

const SignIn = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");

  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email) setErrEmail("Enter your email");
    if (!password) setErrPassword("Create a password");

    if (email && password) {
      try {
        const response = await axiosInstance.post(
          `/user/login`,
          { email, password },
          { withCredentials: true }
        );
        if (response.status === 200) {
          dispatch(updateLoginState(true));
          toast.success("User LoggedIn Successfully", {
            position: "top-right",
          });
          setTimeout(() => navigate("/"), 2000);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "Something went wrong. Please try again.",
          { position: "top-right" }
        );
      }
      setSuccessMsg(
        `Hello, thank you for logging in. Additional details have been sent to your email: ${email}.`
      );
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen bg-gray-100">
      {/* Left Section */}
      <div className="lg:w-1/2 w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 lg:px-10">
        <Link to="/" className="mb-6">
          <img src={logoLight} alt="logo" className="w-32" />
        </Link>
        <h1 className="text-3xl font-bold mb-4">Stay signed in for more</h1>
        <p className="text-lg mb-6">When you sign in, you're with us!</p>
        <div className="space-y-4 text-left">
          {[
            "Get started fast with OREBI",
            "Access all OREBI services",
            "Trusted by online shoppers",
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <BsCheckCircleFill className="text-green-500 text-xl" />
              <p className="text-base">
                <span className="font-semibold">{item}</span>
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 w-full flex items-center justify-center bg-white shadow-lg p-6 lg:p-10">
        {successMsg ? (
          <div className="text-center">
            <p className="text-lg text-green-500 font-medium mb-6">
              {successMsg}
            </p>
            <Link to="/signup">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition">
                Sign Up
              </button>
            </Link>
          </div>
        ) : (
          <form className="space-y-4 w-full max-w-sm">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Sign In
            </h1>
            <div className="space-y-2">
              <label className="block text-gray-600 font-medium">
                Work Email
              </label>
              <input
                type="email"
                value={email}
                onChange={handleEmail}
                placeholder="john@example.com"
                className="w-full p-2 border rounded-md shadow-sm"
              />
              {errEmail && <p className="text-sm text-red-500">{errEmail}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-gray-600 font-medium">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={handlePassword}
                placeholder="Enter your password"
                className="w-full p-2 border rounded-md shadow-sm"
              />
              {errPassword && (
                <p className="text-sm text-red-500">{errPassword}</p>
              )}
            </div>
            <button
              onClick={handleSignUp}
              className="w-full py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition font-medium"
            >
              Sign In
            </button>
            <p className="text-center text-gray-600 mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignIn;
