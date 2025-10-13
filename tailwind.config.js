/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        memphis: {
          coral: '#FF6F61',
          purple: '#6B5B95',
          green: '#88B04B',
          pink: '#F7CAC9',
          yellow: '#FFD662',
          cyan: '#45B7D1',
          orange: '#FF9F1C',
          lavender: '#B565D8',
        }
      },
      fontFamily: {
        baloo: ['"Baloo 2"', 'cursive'],
      },
    },
  },
  plugins: [],
}
