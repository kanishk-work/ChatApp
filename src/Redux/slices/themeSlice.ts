import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const detectSystemTheme = () => {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
};

export interface ThemeState {
  isDarkMode: boolean;
  theme: "system" | "dark" | "light";

  bgColorDark: string;
  accentColorDark: string;
  textColorPrimaryDark: string;
  textColorSecondaryDark: string;

  bgColorLight: string;
  accentColorLight: string;
  textColorPrimaryLight: string;
  textColorSecondaryLight: string;

  focusColorPrimary: string,
  focusColorSecondary: string;

  fontSize: number;
}

const initialState: ThemeState = {
  isDarkMode: detectSystemTheme(),
  theme: "system",

  bgColorDark: "#2E2F40",
  accentColorDark: "#35364C",
  textColorPrimaryDark: "#f1f1f1",
  textColorSecondaryDark: "#94a3b8",

  bgColorLight: "#f1f1f1",
  accentColorLight: "#dbd9d9",
  textColorPrimaryLight: "#242729",
  textColorSecondaryLight: "#515155",

  focusColorPrimary: "#5f14c7",
  focusColorSecondary: "#cdb7eb",

  fontSize: 14,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      state.theme = state.isDarkMode ? "dark" : "light";
    },
    setTheme: (state, action: PayloadAction<"system" | "dark" | "light">) => {
      state.theme = action.payload;
      if (action.payload === "system") {
        state.isDarkMode = detectSystemTheme();
      } else {
        state.isDarkMode = action.payload === "dark";
      }
    },
    setBgColorDark: (state, action: PayloadAction<string>) => {
      state.bgColorDark = action.payload;
    },
    setAccentColorDark: (state, action: PayloadAction<string>) => {
      state.accentColorDark = action.payload;
    },
    setTextColorPrimaryDark: (state, action: PayloadAction<string>) => {
      state.textColorPrimaryDark = action.payload;
    },
    setTextColorSecondaryDark: (state, action: PayloadAction<string>) => {
      state.textColorSecondaryDark = action.payload;
    },

    setBgColorLight: (state, action: PayloadAction<string>) => {
      state.bgColorLight = action.payload;
    },
    setAccentColorLight: (state, action: PayloadAction<string>) => {
      state.accentColorLight = action.payload;
    },
    setTextColorPrimaryLight: (state, action: PayloadAction<string>) => {
      state.textColorPrimaryLight = action.payload;
    },
    setTextColorSecondaryLight: (state, action: PayloadAction<string>) => {
      state.textColorSecondaryLight = action.payload;
    },

    setFocusColorPrimary: (state, action: PayloadAction<string>) => {
      state.focusColorPrimary = action.payload;
    },
    setFocusColorSecondary: (state, action: PayloadAction<string>) => {
      state.focusColorSecondary = action.payload;
    },

    setFontSize: (state, action: PayloadAction<number>) => {
      state.fontSize = action.payload;
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  setBgColorDark,
  setAccentColorDark,
  setTextColorPrimaryDark,
  setTextColorSecondaryDark,
  setBgColorLight,
  setAccentColorLight,
  setTextColorPrimaryLight,
  setTextColorSecondaryLight,
  setFocusColorPrimary,
  setFocusColorSecondary,
  setFontSize,
} = themeSlice.actions;
export default themeSlice.reducer;
