import menu from '../templates/components/menu.js';

export default () => {
  const element = document.getElementById('countColonies');
  element.classList.add(
    'ogi-h-6',
    'ogi-p-1',
    'ogi-grid',
    'ogi-justify-items-center',
    'ogi-place-items-center',
    'ogi-text-center',
    'ogi-bg-image-none',
    'ogi-bg-gradient-to-r',
    'ogi-to-gradient-to',
    'ogi-from-gradient-from',
    'ogi-w-full',
    'ogi-text-coords',
    'ogi-outline',
    'ogi-outline-1',
    'ogi-outline-black',
    'focus:ogi-outline',
    'focus:ogi-outline-1',
    'focus:ogi-outline-black',
    'active:ogi-outline',
    'active:ogi-outline-1',
    'active:ogi-outline-black',
  );
  element.removeAttribute('id');

  const menuOptions = [
    {
      name: 'Settings',
      icon: 'assets/images/settings.svg',
    },
    {
      name: 'Target',
      icon: 'assets/images/target.svg',
    },
    {
      name: 'Search',
      icon: 'assets/images/search.svg',
    },
    {
      name: 'Stats',
      icon: 'assets/images/statistics.svg',
    },
    {
      name: 'Spaceships',
      icon: 'assets/images/spaceship.svg',
    },
    {
      name: 'Overview',
      icon: 'assets/images/overview.svg',
    },
  ];

  element.parentNode.insertBefore(menu(menuOptions), element);
};
