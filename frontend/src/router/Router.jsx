import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import Register from "../components/Register";
import Login from "../components/Login";
import { createContext, useEffect, useState } from "react";
import ForgotPassword from "../components/ForgetPassword";
import AddProduct from "../components/Products/AddProduct";
import axios from "axios";
import PrivateRoute from "../components/PrivateRoute";

// Export LoginContext for use in other components
export const LoginContext = createContext();

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // Can hold admin or user roles

  // Combined hook to check both login status and user role
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        // Check if user is logged in
        const loginResponse = await axios.get(
          `http://localhost:10001/api/user/isLoggedIn`,
          { withCredentials: true }
        );

        if (loginResponse?.status === 200) {
          setIsLoggedIn(true);

          // Check user role after confirming they are logged in
          const roleResponse = await axios.post(
            `http://localhost:10001/api/product/check-role`,
            {},
            { withCredentials: true }
          );

          if (roleResponse?.status === 200 && roleResponse.data.role) {
            setUserRole(roleResponse.data.role); // Assume response contains user role
          }
        }
      } catch (error) {
        setIsLoggedIn(false);
        console.log("User check error: ", error);
      }
    };

    checkUserStatus();
  }, []); // Only run once after component mounts

  return (
    <BrowserRouter>
      <LoginContext.Provider value={{ isLoggedIn, userRole, setIsLoggedIn }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Private route only accessible by admin */}
          <Route
            path="/add-product"
            element={
              <PrivateRoute isAllowed={isLoggedIn && userRole === "admin"}>
                <AddProduct />
              </PrivateRoute>
            }
          />

          {/* Add a route for unauthorized access */}
          <Route path="/unauthorized" element={<h1>Access Denied</h1>} />
        </Routes>
      </LoginContext.Provider>
    </BrowserRouter>
  );
};

export default Router;
