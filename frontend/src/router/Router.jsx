import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import Register from "../components/Register";
import Login from "../components/Login";
import { createContext, useEffect, useState } from "react";
import ForgotPassword from "../components/ForgetPassword";
import AddProduct from "../pages/Dashboard/Products/AddProduct";
import axios from "axios";
import PrivateRoute from "../components/PrivateRoute";
import Products from "../pages/Dashboard/Products/Products";
import Dashboard from "../pages/Dashboard/Dashboard";
import RemoveProduct from "../pages/Dashboard/Products/RemoveProduct";
import EditProduct from "../pages/Dashboard/Products/EditProduct";
import AllProducts from "../pages/Dashboard/Products/AllProducts";
import AllUsers from "../pages/Dashboard/Products/AllUsers";

// Export LoginContext for use in other components
export const LoginContext = createContext();

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Combined hook to check both login status and user role
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        // Check if user is logged in
        const loginResponse = await axios.post(
          `http://localhost:8000/api/user/isLoggedIn`,
          {},
          { withCredentials: true }
        );
        console.log(loginResponse);

        if (loginResponse?.status === 200) {
          setIsLoggedIn(true);
          if (loginResponse.data.role === "admin") {
            setIsAdmin(true);
          }

          // Check user role after confirming they are logged in
          // const roleResponse = await axios.post(
          //   `http://localhost:8000/api/product/check-role`,
          //   {},
          //   { withCredentials: true }
          // );
          // console.log("checking user role", roleResponse);

          // if (roleResponse?.status === 200 && roleResponse.data.role) {
          //   setUserRole(roleResponse.data.role); // Assume response contains user role
          // }
        }
      } catch (error) {
        setIsLoggedIn(false);
        console.log("Error From Check User Role: ", error);
      }
    };

    checkUserStatus();
  }, [isLoggedIn]);
  console.log(isAdmin);

  return (
    <BrowserRouter>
      <LoginContext.Provider value={{ isLoggedIn, isAdmin, setIsLoggedIn }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/products" element={<Products />} />

          {/* Private route only accessible by admin */}
          <Route
            path="/add-product"
            element={
              <PrivateRoute isAllowed={isLoggedIn && isAdmin}>
                <AddProduct />
              </PrivateRoute>
            }
          />

          {/* Admin routes start from here */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute isAllowed={isLoggedIn && isAdmin}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/add-product"
            element={
              <PrivateRoute isAllowed={isLoggedIn && isAdmin}>
                <AddProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/remove-product"
            element={
              <PrivateRoute isAllowed={isLoggedIn && isAdmin}>
                <RemoveProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/edit-product"
            element={
              <PrivateRoute isAllowed={isLoggedIn && isAdmin}>
                <EditProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/all-products"
            element={
              <PrivateRoute isAllowed={isLoggedIn && isAdmin}>
                <AllProducts />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/all-users"
            element={
              <PrivateRoute isAllowed={isLoggedIn && isAdmin}>
                <AllUsers />
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
