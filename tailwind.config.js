/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Open Sans"', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#1a1a1a',
          gold: '#c9a96e',
          light: '#f5f5f0',
          gray: '#6b6b6b',
        }
      }
    },
  },
  plugins: [],
}
