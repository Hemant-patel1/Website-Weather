/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary_light_mode: '#E5EBF3',
        primary_text_light_mode: "#B2B5BB",
      },
    },
  },
  plugins: [],
}