// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // ← MUST INCLUDE .jsx
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}