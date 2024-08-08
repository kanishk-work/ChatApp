/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        "bg-color": "#2E2F40",
        "accent-color": "#35364C",
        "text-primary": "#fff",
        "text-secondary": "#94a3b8",

        "bg-color-light": "#f1f1f1",
        "accent-color-light": "#dbd9d9",
        "text-primary-light": "#242729",
        "text-secondary-light": "#515155",

        "focus-primary": "#5f14c7",
        "focus-secondary": "#cdb7eb"
      },
    },
  },
  plugins: [],
};
