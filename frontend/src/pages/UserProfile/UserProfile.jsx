import { useState } from "react";

const UserProfile = () => {
  // Dummy data for the user profile
  const user = {
    fullName: "John Doe",
    email: "johndoe@example.com",
    phoneNumber: "+1 234 567 8901",
    password: "********",
    address: "123 Main St, Springfield, IL, 62701",
  };

  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState(user);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 flex justify-center items-center">
      <div className="max-w-4xl w-full bg-white text-black p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-8">
          User Profile
        </h1>

        <div className="space-y-6">
          {/* Full Name */}
          <div className="flex justify-between items-center">
            <label className="text-lg font-medium">Full Name</label>
            {isEdit ? (
              <input
                type="text"
                name="fullName"
                value={userData.fullName}
                onChange={handleChange}
                className="bg-gray-100 border-2 border-gray-300 rounded p-2 w-2/3"
              />
            ) : (
              <span className="text-lg">{userData.fullName}</span>
            )}
          </div>

          {/* Email */}
          <div className="flex justify-between items-center">
            <label className="text-lg font-medium">Email</label>
            {isEdit ? (
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="bg-gray-100 border-2 border-gray-300 rounded p-2 w-2/3"
              />
            ) : (
              <span className="text-lg">{userData.email}</span>
            )}
          </div>

          {/* Phone Number */}
          <div className="flex justify-between items-center">
            <label className="text-lg font-medium">Phone Number</label>
            {isEdit ? (
              <input
                type="text"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleChange}
                className="bg-gray-100 border-2 border-gray-300 rounded p-2 w-2/3"
              />
            ) : (
              <span className="text-lg">{userData.phoneNumber}</span>
            )}
          </div>

          {/* Password */}
          <div className="flex justify-between items-center">
            <label className="text-lg font-medium">Password</label>
            {isEdit ? (
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                className="bg-gray-100 border-2 border-gray-300 rounded p-2 w-2/3"
              />
            ) : (
              <span className="text-lg">{userData.password}</span>
            )}
          </div>

          {/* Address */}
          <div className="flex justify-between items-center">
            <label className="text-lg font-medium">Address</label>
            {isEdit ? (
              <textarea
                name="address"
                value={userData.address}
                onChange={handleChange}
                className="bg-gray-100 border-2 border-gray-300 rounded p-2 w-2/3 h-20"
              />
            ) : (
              <span className="text-lg">{userData.address}</span>
            )}
          </div>
        </div>

        {/* Toggle Edit/Save */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setIsEdit(!isEdit)}
            className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            {isEdit ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
