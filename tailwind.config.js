/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
        Londrina: ["Londrina", "cursive"]},
      colors: {
        primary: ["#FFF6F5"],
        secondary: ["#B8F9AD"],
        pink: ["#E5B4DD"],
        yellow: ["#FFEF3B"],
        green: ["#C8D6AF "],
  },
  },
},
  plugins: [],
};
