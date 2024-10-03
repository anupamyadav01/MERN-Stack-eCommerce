import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SendOTP from "./SendOTP";
import VerifyOTP from "./VerifyOTP";
import ResetPassword from "./ResetPassword";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(1);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post(
        `http://localhost:9000/api/user/verify-otp`,
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

  const handleChangePassword = async () => {
    try {
      const response = await axios.post(
        `http://localhost:9000/api/user/reset-password`,
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
        <SendOTP email={email} setEmail={setEmail} setStatus={setStatus} />
      ) : status === 2 ? (
        <VerifyOTP
          otp={otp}
          setOtp={setOtp}
          handleVerifyOTP={handleVerifyOTP}
        />
      ) : (
        <ResetPassword
          password={password}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          handleChangePassword={handleChangePassword}
        />
      )}
    </div>
  );
};

export default ForgotPassword;
