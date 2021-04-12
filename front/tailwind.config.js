module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],

  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        content: "calc(100vh - 16*4px)",
      },
      minHeight: {
        content: "calc(100vh - 16*4px)",
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ["responsive", "hover", "focus", "group-hover"],
    },
  },
  plugins: [],
};
