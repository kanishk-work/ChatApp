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
}

const initialState: ThemeState = {
  isDarkMode: detectSystemTheme(),
  theme: "system",
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
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
