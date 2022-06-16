/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    minWidth: {
      'search': '15rem'
    },
    
    extend: {
      colors: {
        'content': '#f9f9f9',
        'lmBlue': '#065fd4'
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
