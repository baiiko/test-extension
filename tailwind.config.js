/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0d1014',
        metal: '#ffaacca1',
        crystal: '#73e5ffc7',
        deuterium: '#a6e0b0',
        'gradient-hover-from': 'rgb(99, 51, 17)',
        'gradient-current-from': 'rgb(136, 108, 26)',
        'gradient-from': 'rgb(28, 43, 56)',
        'gradient-to': 'rgb(9, 14, 19)',
        'gradient-menu-option-from': 'rgba(0, 0, 0, 0.1)',
        'gradient-menu-option-to': 'rgba(255, 255, 255, 0.1)',
        'gradient-menu-option-hover-from': 'rgba(70, 70, 70, 0.5)',
        'gradient-menu-option-hover-to': 'rgba(138, 138, 138, 0.5)',
        coords: 'rgb(153, 198, 245)',
      },
      backgroundColor: {
        menu: 'rgb(23, 30, 37)',
      },
      backgroundPosition: {
        lifeform1: '0px -280px',
        lifeform2: '-36px -280px',
        lifeform3: '-72px -280px',
        lifeform4: '-108px -280px',
      },
      boxShadow: {
        'planet-content': 'rgba(255, 255, 255, 0.07) 0px 1px inset, rgba(255, 255, 255, 0.03) 0px 16px inset',
        'planet-img': 'rgb(208, 129, 62) 0px 0px 0px 1px',
        menu: 'rgba(255, 255, 255, 0.07) 0px 1px inset',
      },
    },
  },
  plugins: [],
  prefix: 'ogi-',
};
