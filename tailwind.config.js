const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    colors: {
      yellow: colors.yellow,
      "blue-light": "#8382FFa",
      blue: "#4246FB",
      "blue-dark": "#2524E8",
      "blue-darker": "#100EE2",
      red: "#E90C59",
      purple: "#7A52FF",
      black: "#01001F",
      white: "#fff",
      "white-blue": "#F0F0FF",
      gray: "#72727E",
      "gray-light": "#94949E",
      "gray-lighter": "#DAD8E4",
      "gray-lightest": "#F8F8FA",
      "gray-faint": "#fafafd",
      "gray-ghost": "#fefefe",
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
      height: {
        30: "7.5rem",
      },
    },
  },
  variants: {
    textColor: ["hover", "group-hover", "visited", "active"],
    backgroundColor: ["hover", "group-hover", "active"],
    borderColor: ["hover", "group-hover", "focus"],
    scale: ["active"],
    boxShadow: ["hover", "active"],
  },
  plugins: [],
};
