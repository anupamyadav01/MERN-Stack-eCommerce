/* eslint-disable react-hooks/exhaustive-deps */
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { createContext, useEffect } from "react";
import axios from "axios";
import Header from "./components/Home/Header/Header";
import HeaderBottom from "./components/Home/Header/HeaderBotton";
import Footer from "./components/Footer/Footer";
import FooterBottom from "./components/Footer/FooterBottom";
import SignUp from "./pages/Account/SignUp";
import SignIn from "./pages/Account/SignIn";
import ForgotPassword from "./components/ForgetPassword";
import Home from "./pages/Home/Hero.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAdminState,
  updateLoginState,
  updateUser,
} from "./redux/slices/userSlice";
import Contact from "./pages/Contact/Contact.jsx";
import About from "./pages/About/About.jsx";
import FAQPage from "./pages/FAQPage/index.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Products from "./pages/Products/index.jsx";
import AdminDashboardPage from "./pages/Admin/AdminDashboardPage.jsx";
import AdminDashboardOrders from "./pages/Admin/AdminDashboardOrders.jsx";
import AdminDashboardSellers from "./pages/Admin/AdminDashboardSellers.jsx";
import AdminDashboardUsers from "./pages/Admin/AdminDashboardUsers.jsx";
import AdminDashboardProducts from "./pages/Admin/AdminDashboardProducts.jsx";
import ProductDetails from "./components/Products/ProductDetails.jsx";

export const LoginContext = createContext();

const Layout = () => {
  return (
    <div>
      <Header />
      <HeaderBottom />
      <div className="container mx-auto">
        <Outlet />
      </div>
      <Footer />
      <FooterBottom />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        {/* Navbar Links Route */}
        <Route index element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/FAQs" element={<FAQPage />} />

        <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
      </Route>

      {/* User Authentication Route */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="forgot-password" element={<ForgotPassword />} />

      {/* Admin Routes  */}
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="/admin-orders" element={<AdminDashboardOrders />} />
      <Route path="/admin-sellers" element={<AdminDashboardSellers />} />
      <Route path="/admin-users" element={<AdminDashboardUsers />} />
      <Route path="admin-products" element={<AdminDashboardProducts />} />
    </Route>
  )
);
const App = () => {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn);
  const userDetails = useSelector((state) => state.user.userInfo);
  const isAdmin = useSelector((state) => state.user.isAdmin);
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

        if (loginResponse?.status === 200) {
          dispatch(updateLoginState(true));
          // console.log(loginResponse.data.user);
          dispatch(updateUser(loginResponse.data.user));

          if (loginResponse.data.role === "admin") {
            dispatch(updateAdminState(true));
          }
        }
      } catch (error) {
        console.log("Error From Check User Role: ", error);
      }
    };

    checkUserStatus();
  }, [isUserLoggedIn]);
  console.log(
    `User Details: ${userDetails}, isAdmin: ${isAdmin} , isUserLoggedIn: ${isUserLoggedIn}`
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
