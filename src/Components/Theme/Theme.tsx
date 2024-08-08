import SideHeader from "../Shared/SideHeader";
import { useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import Options from "../Shared/Options";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import {
  detectSystemTheme,
  setBgColorDark,
  setBgColorLight,
  setFontSize,
  setTheme,
  toggleTheme,
} from "../../Redux/slices/themeSlice";
import { setShowTheme } from "../../Redux/slices/settingsSlice";
import { RootState } from "../../Redux/store";


const Theme = () => {
  const dispatch = useAppDispatch();
  const { isDarkMode, theme, bgColorDark, bgColorLight, fontSize } = useAppSelector((state: RootState) => state.theme);


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
    <>
      <SideHeader title="theme" backFn={() => dispatch(setShowTheme(false))} />
      <Options optionsList={theme_list} />
      <label className="dynamic-font-size">Font Size: </label>
      <input
        type="range"
        min="10"
        max="50"
        value={fontSize}
        onChange={(e) => dispatch(setFontSize(parseInt(e.target.value)))}
      />
      <div>
        <h2>Dark Mode styles</h2>
        <label>Choose Color: </label>
        <input
          type="color"
          value={bgColorDark}
          onChange={(e) => dispatch(setBgColorDark(e.target.value))}
        />
      </div>
      <div>
        <h2>Light Mode styles</h2>
        <label>Choose Color: </label>
        <input
          type="color"
          value={bgColorLight}
          onChange={(e) => dispatch(setBgColorLight(e.target.value))}
        />
      </div>
    </>
  );
};

export default Theme;

