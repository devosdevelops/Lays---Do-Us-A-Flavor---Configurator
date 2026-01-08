/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,html}'
  ],
  theme: {
    extend: {
      colors: {
        'lay-yellow': '#FFCC00',
        'lay-red': '#C8102E',
        'lay-neutral': '#F5EDE5'
      }
    }
  },
  plugins: []
}
