/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/theme");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        globalPadding: "3.125vw",
      },
      maxWidth: {
        maxWidth: "1440px",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
