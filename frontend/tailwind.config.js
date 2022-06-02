module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
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
      height: ["responsive"],
      transitionProperty: ["hover", "focus", ""],
    },
  },
  plugins: [],
};
