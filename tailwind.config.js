/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'jinson': {
          default: '#00000',
          '50': '#ffffff',
          '500': '#F04C01',
          '800': '#005cb9',
        }
      }
    },
  },
  plugins: [],
}

