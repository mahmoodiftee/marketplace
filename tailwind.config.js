/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
  plugins: [],
};
