import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import Register from "../components/Register";
import Login from "../components/Login";
import ForgotPassword from "../components/ForgetPassword";
import AddProduct from "../pages/Dashboard/Products/AddProduct";
import PrivateRoute from "../components/PrivateRoute";
import Products from "../pages/Dashboard/Products/Products";
import Dashboard from "../pages/Dashboard/Dashboard";
import RemoveProduct from "../pages/Dashboard/Products/RemoveProduct";
import EditProduct from "../pages/Dashboard/Products/EditProduct";
import AllProducts from "../pages/Dashboard/Products/AllProducts";
import AllUsers from "../pages/Dashboard/Products/AllUsers";
import { useContext } from "react";
import { LoginContext } from "../App";
const Router = () => {
  const { isLoggedIn, isAdmin } = useContext(LoginContext);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/products" element={<Products />} />

        {/* Private route only accessible by admin */}
        <Route
          path="/create-product"
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
          path="/admin/create-product"
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
    </BrowserRouter>
  );
};

export default Router;
