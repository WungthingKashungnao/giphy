import { useContext, createContext, useState } from "react";
import { themes } from "../styles/themes"; //this is an array of object holding different hex codes for colors

const ThemeContext = createContext(); //context to access theme
const ThemeUpdateContext = createContext(); //context to update theme

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(0); //state to access theme and update
  const selectedTheme = themes[theme]; //here we are accessing the array of themes

  return (
    <ThemeContext.Provider value={selectedTheme}>
      <ThemeUpdateContext.Provider value={setTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const useThemeUpdate = () => {
  return useContext(ThemeUpdateContext);
};
