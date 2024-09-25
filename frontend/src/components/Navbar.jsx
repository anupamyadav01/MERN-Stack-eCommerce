import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../router/Router";
import { ThemeContext } from "../App"; // Import ThemeContext for dark mode
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const { darkMode, toggleTheme } = useContext(ThemeContext); // Access dark mode and toggle

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `http://localhost:10001/api/user/logout`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("User logged out successfully", {
          position: "top-right",
        });
        setTimeout(() => {
          setIsLoggedIn(false);
        }, 3000);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 w-full z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800 dark:text-white">
          <Link to="/">MyLogo</Link>
        </div>

        {/* Menu for larger screens */}
        <div className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
          >
            Products
          </Link>
          <Link
            to="/services"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
          >
            Contact
          </Link>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
        >
          {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>

        {/* Register & Login buttons */}
        {isLoggedIn ? (
          <span className="flex space-x-4">
            <Link
              to="/dashboard"
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </span>
        ) : (
          <div className="hidden md:flex space-x-4">
            <Link
              to="/register"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Login
            </Link>
          </div>
        )}

        {/* Hamburger menu for small screens */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-700 dark:text-gray-300 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 py-2 space-y-2">
            <Link
              to="/"
              className="block text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
              Products
            </Link>
            <Link
              to="/services"
              className="block text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="block text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
              Contact
            </Link>
            <Link
              to="/register"
              className="block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="block bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
