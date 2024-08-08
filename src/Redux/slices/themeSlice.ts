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
  bgColorLight: string;
  fontSize: number;
}

const initialState: ThemeState = {
  isDarkMode: detectSystemTheme(),
  theme: "system",
  
  bgColorDark: "#2E2F40",
  bgColorLight: "#f1f1f1", 
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
    setBgColorLight: (state, action: PayloadAction<string>) => {
      state.bgColorLight = action.payload;
    },
    setFontSize: (state, action: PayloadAction<number>) => {
      state.fontSize = action.payload;
    },
  },
});

export const { toggleTheme, setTheme, setBgColorDark, setBgColorLight, setFontSize } = themeSlice.actions;
export default themeSlice.reducer;
