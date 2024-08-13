import SideHeader from "../Shared/SideHeader";
import { useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import Options from "../Shared/Options";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import {
  detectSystemTheme,
  setBgColorDark,
  setBgColorLight,
  setAccentColorLight,
  setFontSize,
  setTheme,
  toggleTheme,
  setAccentColorDark,
  setTextColorPrimaryLight,
  setTextColorSecondaryLight,
  setTextColorPrimaryDark,
  setTextColorSecondaryDark,
  setFocusColorPrimary,
  setFocusColorSecondary,
} from "../../Redux/slices/themeSlice";
import { setShowTheme } from "../../Redux/slices/settingsSlice";
import { RootState } from "../../Redux/store";


const Theme = () => {
  const dispatch = useAppDispatch();
  const { isDarkMode, theme, bgColorDark, accentColorDark, textColorPrimaryDark, textColorSecondaryDark, bgColorLight, accentColorLight, textColorPrimaryLight, textColorSecondaryLight, focusColorPrimary, focusColorSecondary, fontSize } = useAppSelector((state: RootState) => state.theme);


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
      <label className="dynamic-font-size dynamic-text-color-primary mt-2">Font Size:{fontSize} </label>
      <input
        type="range"
        min="10"
        max="22"
        value={fontSize}
        onChange={(e) => dispatch(setFontSize(parseInt(e.target.value)))}
      />

      {/* dark mode */}
      <div className="flex flex-col p-3 dynamic-text-color-primary">
        <h4>Dark Mode styles</h4>
        <label>Bg Color: </label>
        <input
          type="color"
          value={bgColorDark}
          onChange={(e) => dispatch(setBgColorDark(e.target.value))}
        />
        <label>Accent Color: </label>
        <input
          type="color"
          value={accentColorDark}
          onChange={(e) => dispatch(setAccentColorDark(e.target.value))}
        />

        <label>Primary Text Color:</label>
        <input
          type="color"
          value={textColorPrimaryDark}
          onChange={(e) => dispatch(setTextColorPrimaryDark(e.target.value))}
        />
        <label>Secondary Text Color: </label>
        <input
          type="color"
          value={textColorSecondaryDark}
          onChange={(e) => dispatch(setTextColorSecondaryDark(e.target.value))}
        />
      </div>
      
      {/* light mode */}
      <div className="flex flex-col p-3 dynamic-text-color-secondary">
        <h4>Light Mode styles</h4>
        <label> Bg Color: </label>
        <input
          type="color"
          value={bgColorLight}
          onChange={(e) => dispatch(setBgColorLight(e.target.value))}
        />
        <label>Accent Color: </label>
        <input
          type="color"
          value={accentColorLight}
          onChange={(e) => dispatch(setAccentColorLight(e.target.value))}
        />

        <label>Primary Text Color: </label>
        <input
          type="color"
          value={textColorPrimaryLight}
          onChange={(e) => dispatch(setTextColorPrimaryLight(e.target.value))}
        />
        <label>Choose Secondary Text Color: </label>
        <input
          type="color"
          value={textColorSecondaryLight}
          onChange={(e) => dispatch(setTextColorSecondaryLight(e.target.value))}
        />
      </div>

      <div className="flex flex-col p-3 dynamic-text-color-secondary">
      <h4>Focus Colors (notifications)</h4>
      <label>Text Color: </label>
        <input
          type="color"
          value={focusColorPrimary}
          onChange={(e) => dispatch(setFocusColorPrimary(e.target.value))}
        />
        <label>Background Color: </label>
        <input
          type="color"
          value={focusColorSecondary}
          onChange={(e) => dispatch(setFocusColorSecondary(e.target.value))}
        />
      </div>
    </>
  );
};

export default Theme;

