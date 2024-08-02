import React, { useEffect } from "react";
import HomeLayout from "./Layout/HomeLayout";
import { detectSystemTheme } from "./Redux/slices/themeSlice";
import { useAppSelector } from "./Redux/hooks";
const value = detectSystemTheme();
console.log({ value });
const App: React.FC = () => {
  const { isDarkMode } = useAppSelector((state) => state.theme);
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);
  return <HomeLayout />;
};

export default App;
