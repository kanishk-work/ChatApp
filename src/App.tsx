import React, { useEffect } from "react";
import HomeLayout from "./Layout/HomeLayout";
import { detectSystemTheme } from "./Redux/slices/themeSlice";
import { useAppSelector } from "./Redux/hooks";
import { RootState } from "./Redux/store";
import { injectStyles } from "./Utils/injectStyles";
const value = detectSystemTheme();
console.log({ value });
const App: React.FC = () => {
  const {
    bgColorDark,
    accentColorDark,
    textColorPrimaryDark,
    textColorSecondaryDark,
    bgColorLight,
    accentColorLight,
    textColorPrimaryLight,
    textColorSecondaryLight,
    focusColorPrimary,
    focusColorSecondary,
    fontSize,
    isDarkMode,
  } = useAppSelector((state: RootState) => state.theme);

  useEffect(() => {
    injectStyles(
      bgColorDark,
      accentColorDark,
      textColorPrimaryDark,
      textColorSecondaryDark,
      bgColorLight,
      accentColorLight,
      textColorPrimaryLight,
      textColorSecondaryLight,
      focusColorPrimary,
      focusColorSecondary,
      fontSize,
      isDarkMode
    );
  }, [
    bgColorDark,
    accentColorDark,
    textColorPrimaryDark,
    textColorSecondaryDark,
    bgColorLight,
    accentColorLight,
    textColorPrimaryLight,
    textColorSecondaryLight,
    focusColorPrimary,
    focusColorSecondary,
    fontSize,
    isDarkMode,
  ]);

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
