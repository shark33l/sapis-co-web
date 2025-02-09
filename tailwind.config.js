/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Manrope', 'sans-serif']
    },
    extend: {
      fontFamily: {
        // manrope: ['Manrope', 'sans-serif'],
      },
      colors: {
        'dark-ui-grey': '#121212',
        'light-nav-bg': '#F6F8F8'
      }
    },
  },
  plugins: [],
}

