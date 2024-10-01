import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Router from "./router/Router";

export const LoginContext = createContext();
const App = () => {
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
        <Router />
      </LoginContext.Provider>
    </div>
  );
};

export default App;
