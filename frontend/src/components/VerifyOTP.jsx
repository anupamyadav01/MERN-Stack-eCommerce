/* eslint-disable react/prop-types */
const VerifyOTP = ({ otp, setOtp, handleVerifyOTP }) => {
  return (
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
  );
};

export default VerifyOTP;
