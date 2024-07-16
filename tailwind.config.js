/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.js',
  ],
  theme: {
    extend: {},
    colors: {
      'bg-dark': '#0d1014',
      metal: '#ffaacca1',
      crystal: '#73e5ffc7',
      deuterium: '#a6e0b0',
      'gradient-from': 'rgb(28, 43, 56)',
      'gradient-to': 'rgb(9, 14, 19)',
    },
    boxShadow: {
      planet: 'rgba(255, 255, 255, 0.07) 0px 1px inset, rgba(255, 255, 255, 0.03) 0px 16px inset',
    },
  },
  plugins: [],
  prefix: 'ogi-',
};
