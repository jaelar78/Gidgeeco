/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gidgee': {
          'brown': '#8B6914',
          'gold': '#C9A84C',
          'sand': '#F5F0E8',
          'earth': '#D4A574',
          'dark': '#3D2B1F',
          'light': '#FDF8F0',
          'cream': '#FAF5ED'
        }
      },
      fontFamily: {
        'serif': ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        'sans': ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}
