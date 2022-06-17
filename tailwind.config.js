/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bars': '#212121',
        'lmBlue': '#3ea6ff',
        'textCol': '#aaaaaa'
      },
      fontSize: {
        'mini': '0.5rem',
        'xxs' : '0.65rem'
    },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
