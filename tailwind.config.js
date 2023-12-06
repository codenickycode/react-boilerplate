/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{debug,src}/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: { primary: "#1f1f1f", secondary: "#27272a" },
        text: { primary: "#fff" },
        accent: { primary: "#18dcff" },
        divider: { primary: "#4d4d4d" },
        code: { background: "#000", text: "#fffafa" },
      },
      gridTemplateColumns: {
        "auto-fill-38rem": "repeat(auto-fill, minmax(38rem, 1fr))",
      },
      padding: { card: "0.25rem" },
    },
  },
  plugins: [],
};
