import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Home/Header/Header";
import HeaderBottom from "./components/Home/Header/HeaderBotton";
import Footer from "./components/Footer/Footer";
import FooterBottom from "./components/Footer/FooterBottom";
import Home from "./components/Home";
import SignUp from "./pages/Account/SignUp";
import SignIn from "./pages/Account/SignIn";
import ForgotPassword from "./components/ForgetPassword";
import Products from "./pages/Dashboard/Products/Products";
import AddProduct from "./pages/Dashboard/Products/AddProduct";
import EditProduct from "./pages/Dashboard/Products/EditProduct";
import RemoveProduct from "./pages/Dashboard/Products/RemoveProduct";
import AllProducts from "./pages/Dashboard/Products/AllProducts";
import AllUsers from "./pages/Dashboard/Products/AllUsers";

export const LoginContext = createContext();

const Layout = () => {
  return (
    <div className="border border-red-500">
      <Header />
      <HeaderBottom />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route index element={<Home />}></Route>
        {/* <Route path="/shop" element={<Shop />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/journal" element={<Journal />}></Route> */}

        <Route path="products" element={<Products />} />
        <Route path="create-product" element={<AddProduct />} />
        <Route path="products/:productId" element={<EditProduct />} />
        <Route path="remove-product/:productId" element={<RemoveProduct />} />
        <Route path="all-products" element={<AllProducts />} />
        <Route path="all-users" element={<AllUsers />} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
    </Route>
  )
);
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Combined hook to check both login status and user role
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        // Check if user is logged in
        const loginResponse = await axios.post(
          `http://localhost:9000/api/user/isLoggedIn`,
          {},
          { withCredentials: true }
        );
        console.log("is logged response", loginResponse.data.role);

        if (loginResponse?.status === 200) {
          setIsLoggedIn(true);
          if (loginResponse.data.role === "admin") {
            setIsAdmin(true);
          }
        }
      } catch (error) {
        // setIsLoggedIn(false);
        console.log("Error From Check User Role: ", error);
      }
    };

    checkUserStatus();
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 transition-colors">
      <LoginContext.Provider value={{ isLoggedIn, isAdmin, setIsLoggedIn }}>
        <RouterProvider router={router} />
      </LoginContext.Provider>
    </div>
  );
};

export default App;
