const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    colors: {
      yellow: colors.yellow,
      "blue-light": "#8382FFa",
      blue: "#3633FF",
      "blue-dark": "#100EE2",
      red: "#E90C59",
      purple: "#7A52FF",
      black: "#01001F",
      white: "#fff",
      "white-blue": "#F0F0FF",

      gray: "#72727E",
      "gray-light": "#94949E",
      // "gray-light": "#91919C",
      "gray-lighter": "#E1E1E9",
      "gray-lightest": "#F8F8FD",
      // "gray-faint": "#FCFCFE",
      "gray-faint": "#FbFbFc",
    },
    fontSize: {
      xs: ["11px", "16px"],
      sm: ["12px", "16px"],
      13: ["13px", "20px"],
      md: ["15px", "24px"],
      base: ["16px", "24px"],
      18: ["18px", "28px"],
      22: ["22px", "28px"],
      26: ["26px", "32px"],
      "5xl": ["45px", "52px"],
      "6xl": ["54px", "60px"],
      "7xl": ["65px", "72px"],
    },
    extend: {
      boxShadow: {
        inset: "inset 0 1px 0 rgba(0, 0, 0, 0.025)",
      },
    },
  },
  variants: {
    textColor: ["hover", "group-hover", "visited"],
    backgroundColor: ["hover", "group-hover", "active"],
    borderColor: ["hover", "group-hover", "focus"],
    scale: ["active"],
  },
  plugins: [],
};
