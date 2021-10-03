const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    screens: {
      sm: "425px",
      md: "640px",
    },
    colors: {
      red: colors.rose,
      "red-300": "#F9768C",
      "red-400": "#F75F78",
      green: colors.emerald,
      // "green-500": "#04A474",
      yellow: colors.yellow,
      "blue-light": "#7B9DF9",
      blue: "#0A47F2",
      "blue-dark": "#093FD5",
      purple: "#7A52FF",
      black: "#00030F",
      white: "#fff",
      "white-blue": "#F0F0FF",
      // "gray-dark": "#20263E",
      "gray-dark": "#374060",
      gray: "#677396",
      "gray-light": "#8D90A0",
      "gray-lightish": "#D5D8E1",
      "gray-lighter": "#E2E4E9",
      "gray-faint": "#FAFAFD",
      "gray-ghost": "#FCFBFE",
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
        outer: "0 1px 0 rgba(0, 0, 0, 0.04)",
      },
      height: {
        30: "7.5rem",
      },
      maxHeight: {
        4.5: "1.125rem",
      },
    },
  },
  variants: {
    textColor: [
      "hover",
      "group-hover",
      "visited",
      "focus",
      "group-focus",
      "active",
    ],
    backgroundColor: ["hover", "group-hover", "focus", "active"],
    borderWidth: ["hover", "focus", "active"],
    borderColor: ["hover", "group-hover", "focus", "active"],
    scale: ["active"],
    boxShadow: ["hover", "active"],
    translate: ["hover", "active"],
  },
  plugins: [],
};
