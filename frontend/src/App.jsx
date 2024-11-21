/* eslint-disable react/prop-types */
import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { createContext, useEffect } from "react";
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
import ProductsPage from "./pages/Products/ProductsPage.jsx";
import ProductDetails from "./components/Products/ProductDetails.jsx";
import axiosInstance from "./axiosCongig.js";

// Lazy load AdminRoutes
const AdminRoutes = lazy(() => import("./pages/Admin/AdminRoutes.jsx"));
export const LoginContext = createContext();

const Layout = () => (
  <div className="flex flex-col min-h-screen bg-white">
    {/* Header */}
    <Header />
    <HeaderBottom />

    {/* Main Content */}
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 shadow-md rounded-md">
      <Outlet />
    </main>

    {/* Footer */}
    <Footer />
    <FooterBottom />
  </div>
);

const AdminGuard = ({ children }) => {
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/"); // Redirect non-admin users to home or login
    }
  }, [isAdmin, navigate]);

  return isAdmin ? children : null;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/FAQs" element={<FAQPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
      </Route>

      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="forgot-password" element={<ForgotPassword />} />

      {/* Admin Routes with Guard */}
      <Route
        path="/admin/*"
        element={
          <AdminGuard>
            <Suspense fallback={<div>Loading...</div>}>
              <AdminRoutes />
            </Suspense>
          </AdminGuard>
        }
      />
    </Route>
  )
);

const App = () => {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const loginResponse = await axiosInstance.post(`/user/isLoggedIn`, {});
        if (loginResponse?.status === 200) {
          dispatch(updateLoginState(true));
          dispatch(updateUser(loginResponse?.data));
          if (loginResponse.data.role === "admin") {
            dispatch(updateAdminState(true));
          }
        }
      } catch (error) {
        console.log("Error From Check User Role: ", error);
      }
    };

    checkUserStatus();
  }, [dispatch, isUserLoggedIn]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
