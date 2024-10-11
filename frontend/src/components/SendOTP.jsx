/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import axiosInstance from "../axiosCongig";

const SendOTP = ({ email, setStatus, setEmail }) => {
  const handleSendOTP = async () => {
    try {
      const response = await axiosInstance.post(`/user/forgot-password`, {
        email,
      });
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
      console.log(error.response.data.message);
      toast.error("User not found", { position: "top-right" });
    }
  };
  return (
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
  );
};

export default SendOTP;
