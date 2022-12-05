/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: [
        "Inter, sans-serif",
        { fontFeatureSettings: '"cv11", "ss01"' },
      ],
      display: [
        "Space Mono,monospace"
      ]
    },
    extend: {},
  },
  plugins: [],
}