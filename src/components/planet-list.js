import empire from './empire.js';
import Data from '../services/data.js';
import planetList from '../templates/components/planet-list.js';
import svg from '../services/svg.js';

export default async () => {
  const element = document.getElementById('planetList');
  element.classList.add('!ogi-hidden');

  const planetListElement = document.createElement('div');
  planetListElement.classList.add('ogi-bg-bg-dark', 'ogi-gap-1', 'ogi-grid', 'ogi-p-1', 'ogi-justify-center');
  planetListElement.id = 'planetList';

  element.parentNode.insertBefore(planetListElement, element);
  const loader = await svg(chrome.runtime.getURL('assets/images/loader.svg'));
  planetListElement.appendChild(loader);

  await empire();

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

  element.remove();
  planetListElement.classList.remove('ogi-justify-center');
  loader.remove();

  planetList(planetListElement, Object.values(Data.planets));
};
