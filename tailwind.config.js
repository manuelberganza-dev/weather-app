/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "weatherBg": "url('/bg-weather.jpg')"
      }
    },
  },
  plugins: [],
}

