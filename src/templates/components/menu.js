import svg from '../../services/svg.js';

export default (menuOptions) => {
  const menu = document.createElement('div');
  menu.classList.add(
    'ogi-bg-menu',
    'ogi-p-1',
    'ogi-rounded-t',
    'ogi-shadow',
    'ogi-shadow-menu',
    'ogi-flex',
    'ogi-justify-end',
    'ogi-gap-1',
  );

  menuOptions.forEach(async (menuOption) => {
    const menuElement = document.createElement('div');
    menuElement.classList.add(
      'ogi-bg-gradient-to-t',
      'ogi-from-gradient-menu-option-from',
      'hover:ogi-from-gradient-menu-option-hover-from',
      'ogi-from-50%',
      'ogi-to-gradient-menu-option-to',
      'hover:ogi-to-gradient-menu-option-hover-to',
      'ogi-to-50%',
      'ogi-cursor-pointer',
      'ogi-p-1',
      'ogi-h-7',
      'ogi-bg-black',
      'ogi-rounded',
      'ogi-w-7',
      'ogi-fill-gray-500',
      'hover:ogi-fill-gray-300',
    );

    const img = await svg(chrome.runtime.getURL(menuOption.icon));
    menuElement.appendChild(img);

    menu.appendChild(menuElement);
  });

  return menu;
};
