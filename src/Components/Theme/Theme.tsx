import SideHeader from "../Shared/SideHeader";
import { useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import Options from "../Shared/Options";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import {
  detectSystemTheme,
  setTheme,
  toggleTheme,
} from "../../Redux/slices/themeSlice";
import { setShowTheme } from "../../Redux/slices/settingsSlice";

const Theme = () => {
  const dispatch = useAppDispatch();
  const { isDarkMode, theme } = useAppSelector((state) => state.theme);

  const icon = isDarkMode ? <FaMoon /> : <FaSun className="text-yellow-500" />;
  const theme_list = [
    {
      title: "toggle theme",
      icon: icon,
      action: () => darkModeHandler(),
    },
    {
      title: "system theme",
      action: () => dispatch(setTheme("system")),
    },
    {
      title: "dark theme",
      action: () => dispatch(setTheme("dark")),
    },
    {
      title: "light theme",
      action: () => dispatch(setTheme("light")),
    },
  ];
  console.log({ theme });
  useEffect(() => {
    if (theme === "system") {
      dispatch(setTheme(detectSystemTheme() ? "dark" : "light"));
    }
  }, [dispatch, theme]);

  const darkModeHandler = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div>
      <SideHeader title="theme" backFn={() => dispatch(setShowTheme(false))} />
      <Options optionsList={theme_list} />
    </div>
  );
};

export default Theme;
