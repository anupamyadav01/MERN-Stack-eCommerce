import { useState } from "react";

/* eslint-disable react/prop-types */
const ResetPassword = ({
  password,
  setPassword,
  setConfirmPassword,
  confirmPassword,
  handleChangePassword,
}) => {
  const [passwordStrength, setPasswordStrength] = useState("");
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
  return (
    <div className="max-w-md mx-auto p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Reset Password</h2>
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
  );
};

export default ResetPassword;
