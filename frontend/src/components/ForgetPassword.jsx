import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(1);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleSendOTP = async () => {
    try {
      const response = await axios.post(
        `http://localhost:10001/api/user/forgot-password`,
        { email }
      );
      if (response.status === 200) {
        console.log("OTP sent successfully");
        toast.success("OTP sent successfully", {
          position: "top-right",
        });
        setTimeout(() => {
          setStatus(2);
        }, 2000);
      }
    } catch (error) {
      console.log("error from handleSendOTP", error);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post(
        `http://localhost:10001/api/user/verify-otp`,
        {
          email,
          otp,
        }
      );
      if (response.status === 200) {
        console.log("OTP verified successfully");
        toast.success("OTP verified successfully", {
          position: "top-right",
        });
        setTimeout(() => {
          setStatus(3);
        }, 2000);
      }
    } catch (error) {
      console.log("error from handleVerifyOTP", error);
    }
  };

  // reset password

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordStrength("Weak");
    } else if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /\d/.test(password)
    ) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Medium");
    }
  };

  const handleChangePassword = async () => {
    try {
      const response = await axios.post(
        `http://localhost:10001/api/user/reset-password`,
        {
          email,
          password,
          confirmPassword,
        }
      );
      if (response.status === 201) {
        console.log("Password reset successfully");
        toast.success("Password reset successfully", {
          position: "top-right",
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log("error from change password", error);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <Toaster />
      {status === 1 ? (
        <div className="max-w-md mx-auto p-6 rounded-lg shadow-md bg-white">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
            Forgot Password
          </h2>
          <p className="text-gray-500 mb-6">
            Enter your email to receive a one-time password (OTP).
          </p>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* {error && <p className="text-red-500 text-sm mt-2">{error}</p>} */}
          <button
            className="w-full mt-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={handleSendOTP}
          >
            Send OTP
          </button>
        </div>
      ) : status === 2 ? (
        <div className="max-w-md mx-auto p-6 rounded-lg shadow-md bg-white">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
            Verify OTP
          </h2>
          <p className="text-gray-500 mb-6">
            Enter the 6-digit OTP sent to your email.
          </p>
          <input
            type="text"
            placeholder="Enter OTP"
            maxLength="6"
            className="w-full p-3 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg tracking-widest"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            className="w-full mt-4 py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={handleVerifyOTP}
          >
            Verify OTP
          </button>
        </div>
      ) : (
        <div className="max-w-md mx-auto p-6 rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Reset Password
          </h2>
          <input
            type="password"
            placeholder="New password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword();
            }}
          />
          <p
            className={`mt-2 text-sm ${
              passwordStrength === "Strong"
                ? "text-green-500"
                : passwordStrength === "Medium"
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            Password strength: {passwordStrength}
          </p>
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full p-3 mt-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className="w-full mt-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={handleChangePassword}
          >
            Change Password
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
