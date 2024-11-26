/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
        Londrina: ["Londrina shadow", "sans-serif"],
      },
      colors: {
        primary: ["#FFF6F5"],
        secondary: ["#B8F9AD"],
        pink: ["#E5B4DD"],
        yellow: ["#FFEF3B"],
        green: ["#C8D6AF"],
      },
      textShadow: {
        titleBlack:
          "-1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
