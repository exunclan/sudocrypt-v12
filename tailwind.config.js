const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.tsx",
    "./resources/**/*.ts",
    "./resources/**/*.vue",
    "./resources/**/*.css",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: "#1F1C1C",
        "sudo-red": "#DF584F",
        "sudo-green": "#8CBEB2",
        "sudo-yellow": "#F3B562",
      },
      fontFamily: {
        mono: ["VCR OSD Mono", ...defaultTheme.fontFamily.mono],
        sans: ["Arcade", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        m2xl: { max: "1535px" },
        // => @media (max-width: 1535px) { ... }

        mxl: { max: "1279px" },
        // => @media (max-width: 1279px) { ... }

        mlg: { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        mmd: { max: "767px" },
        // => @media (max-width: 767px) { ... }

        msm: { max: "639px" },
        // => @media (max-width: 639px) { ... }
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
