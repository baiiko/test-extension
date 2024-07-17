import empire from './empire.js';
import Data from '../services/data.js';
import planetList from '../templates/components/planet-list.js';

export default async () => {
  await empire();

  const element = document.getElementById('planetList');

  element.childNodes.forEach((node) => {
    if (node instanceof Element && node.getAttribute('id')) {
      const id = parseInt(node.getAttribute('id').replace('planet-', ''), 10);

      Data.planets[id].image = node.querySelector('.planetPic').src;
      Data.planets[id].attack = !!node.querySelector('.alert');

      if (node.querySelector('.moonlink')) {
        Data.planets[id].moon.image = node.querySelector('.icon-moon').src;
      }
    }
  });

  const planetListElement = document.createElement('div');
  planetListElement.classList.add('ogi-bg-bg-dark', 'ogi-gap-1', 'ogi-grid', 'ogi-p-1');
  planetListElement.id = 'planetList';

  element.parentNode.insertBefore(planetListElement, element);
  element.remove();

  planetList(planetListElement, Object.values(Data.planets));
};
