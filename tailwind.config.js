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
        // brand colors
        'brand-primary'   : '#1D1C4F',
        'brand-secondary' : '#0089CF',
        'dark-ui-grey'    : '#121212',
        'light-nav-bg'    : '#F6F8F8'
      }
    },
  },
  plugins: [],
}

