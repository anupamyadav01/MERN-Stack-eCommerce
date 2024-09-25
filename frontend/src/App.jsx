import Router from "./router/Router";
import { createContext, useState } from "react";

// Create a ThemeContext
export const ThemeContext = createContext();

const App = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="min-h-screen bg-gray-100 text-gray-800 transition-colors">
        <Router />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
