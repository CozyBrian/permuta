/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        permuta: {
          primary: "#5C9AD4",
          primaryDark: "#2B6FAF",
          edge: "#D0D5DD",
          background: "#F8F9F9",
          text: "#062038",
        },
      },
    },
  },
  plugins: [],
};
