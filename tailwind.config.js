/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    colors: {
      'azure': {
        100: '#001b3f',
        200: '#002f65',
        300: '#00458f',
        400: '#005cbb',
        500: '#0074e9',
        600: '#438fff',
        700: '#7cabff',
        800: '#abc7ff',
        900: '#d7e3ff'
      },
      gray: colors.gray,
      orange: colors.orange,
      green: colors.green,
      yellow: colors.yellow,
      red: colors.red,
      white: colors.white,
      black: colors.black
    },
    extend: {},
  },
  plugins: [],
}

