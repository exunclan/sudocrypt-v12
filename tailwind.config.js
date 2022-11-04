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
        sans: ["VCR OSD Mono", ...defaultTheme.fontFamily.sans],
        mono: ["Arcade", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
