/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sora)"],
      },
      keyframes: {
        gradient: {
          "0%": {
            "background-position": "0% 200%",
          },
          "100%": {
            "background-position": "0% 0%",
          },
        },
      },
      animation: {
        gradient: "gradient 2s ease infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
