// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "ui-sans-serif", "system-ui", "sans-serif"], // body text
        heading: ["Roboto", "sans-serif"], // headings if you want same
      },
    },
  },
  plugins: [],
};
