// import defaultTheme from "tailwindcss/defaultTheme";

// export default {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ["Roboto", ...defaultTheme.fontFamily.sans],
//         heading: ["Poppins", ...defaultTheme.fontFamily.sans],
//       },
//       colors: {
//         darkText: "#171717",
//         lightText: "#ededed",
//         navy: {
//           DEFAULT: "#0C2340",
//           dark: "#08172C",
//         },
//         aqua: {
//           DEFAULT: "#1BC9D0",
//           dark: "#13979C",
//         },
//         green: {
//           DEFAULT: "#27AE60",
//           dark: "#1D8046",
//         },
//         lightGray: "#F5F5F5",
//         background: "#ffffff",
//         foreground: "#171717",
//       },
//     },
//   },
//   darkMode: "media",
//   plugins: [require("tailwindcss-animate")],
// };

// tailwind.config.js
import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "media", // "class" also works if you're toggling manually
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", ...fontFamily.sans],
        heading: ["Poppins", ...fontFamily.sans],
      },
      colors: {
        darkText: "#171717",
        lightText: "#ededed",
        navy: {
          DEFAULT: "#0C2340",
          dark: "#08172C",
        },
        aqua: {
          DEFAULT: "#1BC9D0",
          dark: "#13979C",
        },
        green: {
          DEFAULT: "#27AE60",
          dark: "#1D8046",
        },
        lightGray: "#F5F5F5",
        background: "#ffffff",
        foreground: "#171717",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
