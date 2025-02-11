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
        arabic: ['IBM Plex Sans Arabic', 'sans-serif'],
      },
      colors: {
        // brand colors
        'brand-primary': '#1D1C4F',
        'brand-secondary': '#0089CF',
        'dark-ui-grey': '#121212',
        'light-nav-bg': '#F6F8F8'
      },
      // keyframes: {
      //   appear: {
      //     "0%": {
      //       opacity: "0",
      //       filter: blur(100)
      //     },
      //     "100%": {
      //       opacity: "1",
      //       filter: blur(0)
      //     }
      //   }
      // },
      // animation: {
      //   appear: "appear 10s ease-in",
      // }
    },
  },
  plugins: [],
}

