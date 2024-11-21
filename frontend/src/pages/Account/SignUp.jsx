import { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";

import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../axiosCongig";

const SignUp = () => {
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [checked, setChecked] = useState(false);

  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errAddress, setErrAddress] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
    setErrPhone("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
    setErrAddress("");
  };
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (checked) {
      if (!clientName) setErrClientName("Enter your name");
      if (!email) setErrEmail("Enter your email");
      else if (!EmailValidation(email)) setErrEmail("Enter a valid email");
      if (!phone) setErrPhone("Enter your phone number");
      if (!password) setErrPassword("Create a password");
      else if (password.length < 6)
        setErrPassword("Passwords must be at least 6 characters");
      if (!address) setErrAddress("Enter your address");

      if (
        clientName &&
        email &&
        EmailValidation(email) &&
        password &&
        password.length >= 6 &&
        address
      ) {
        try {
          const response = await axiosInstance.post(
            `/user/register`,
            { name: clientName, email, password },
            { withCredentials: true }
          );
          if (response.status === 201) {
            setSuccessMsg(`Hello ${clientName}, welcome to OREBI.`);
            toast.success("User registered successfully", {
              position: "top-right",
              style: { background: "#333", color: "#fff" },
            });
            setTimeout(() => navigate("/signin"), 2000);
          }
        } catch (error) {
          toast.error(error.response.data.message, { position: "top-right" });
        }
      }
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row items-center justify-between bg-gray-100">
      <Toaster />

      {/* Left Section */}
      <div className="w-full md:w-1/2 h-1/2 py-8 md:py-0 md:h-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white px-4 md:px-10">
        <Link to="/" className="mb-6">
          <img src={logoLight} alt="logo" className="w-24 md:w-32" />
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          Get started for free
        </h1>
        <p className="text-base md:text-lg mb-6 text-center">
          Create your account to access more
        </p>
        <div className="space-y-4 text-left">
          {[
            "Get started fast with OREBI",
            "Access all OREBI services",
            "Trusted by online shoppers",
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <BsCheckCircleFill className="text-green-500 text-lg md:text-xl" />
              <p className="text-sm md:text-base">
                <span className="font-semibold">{item}</span>
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center bg-white shadow-lg px-4 py-6 md:p-10 rounded-lg">
        {successMsg ? (
          <div className="text-center">
            <p className="text-lg text-green-500 font-medium mb-6">
              {successMsg}
            </p>
            <Link to="/signin">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition">
                Sign in
              </button>
            </Link>
          </div>
        ) : (
          <form className="space-y-4 w-full max-w-sm md:max-w-md">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800 text-center">
              Create your account
            </h1>
            {[
              {
                label: "Full Name",
                value: clientName,
                handler: handleName,
                error: errClientName,
                placeholder: "e.g., John Doe",
              },
              {
                label: "Email",
                value: email,
                handler: handleEmail,
                error: errEmail,
                placeholder: "e.g., john@example.com",
              },
              {
                label: "Phone Number",
                value: phone,
                handler: handlePhone,
                error: errPhone,
                placeholder: "e.g., 1234567890",
              },
              {
                label: "Password",
                value: password,
                handler: handlePassword,
                error: errPassword,
                placeholder: "Create password",
                type: "password",
              },
              {
                label: "Address",
                value: address,
                handler: handleAddress,
                error: errAddress,
                placeholder: "e.g., Street, City",
              },
            ].map(
              (
                { label, value, handler, error, placeholder, type = "text" },
                index
              ) => (
                <div key={index} className="-space-y-0.5">
                  <label className="block text-gray-600 font-medium">
                    {label}
                  </label>
                  <input
                    type={type}
                    value={value}
                    onChange={handler}
                    placeholder={placeholder}
                    className="w-full p-2 border rounded-md shadow-sm"
                  />
                  {error && <p className="text-sm text-red-500">{error}</p>}
                </div>
              )
            )}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
                className="w-4 h-4"
              />
              <p className="text-sm text-gray-600">
                I agree to the{" "}
                <span className="text-blue-600">Terms of Service</span> and{" "}
                <span className="text-blue-600">Privacy Policy</span>.
              </p>
            </div>
            <button
              onClick={handleSignUp}
              disabled={!checked}
              className={`w-full py-2 text-white font-medium rounded-md shadow ${
                checked
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Create Account
            </button>
            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/signin" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
