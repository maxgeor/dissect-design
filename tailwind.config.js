const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media",
  theme: {
    screens: {
      sm: "425px",
      md: "640px",
    },
    colors: {
      yellow: colors.yellow,
      red: {
        ...colors.rose,
        "300": "#F9768C",
        "400": "#F65A74",
      },
      green: {
        ...colors.emerald,
        100: "#E5FFF2",
      },
      blue: {
        dark: "#093FD5",
        DEFAULT: "#0A47F2",
        lighter: "#7B9DF9",
        light: "#3166F6",
      },
      black: "#010619",
      white: {
        DEFAULT: "#FFFFFF",
        blue: "#F0F0FF",
      },
      gray: {
        DEFAULT: "#677396",
        light: "#888FAF",
        lightish: "#D5D8E1",
        lighter: "#E2E8EC",
        faint: "#FAFAFD",
        ghost: "#FCFBFE",
      }

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
        outer: "0 1px 0 rgba(0, 0, 0, 0.03)",
      },
      height: {
        30: "7.5rem",
      },
      maxHeight: {
        4.5: "1.125rem",
      },
      margin: {
        18: "4.5rem",
      },
    },
  },
  variants: {
    textColor: [
      "visited",
      "hover",
      "group-hover",
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
    textDecoration: ["group-hover", "group-focus"],
    display: ['focus'],
  },
  plugins: [],
};
