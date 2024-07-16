import empire from './empire.js';
import Data from '../services/data.js';
import planetList from '../templates/components/planet-list.js';

export default async function () {
  await empire();

  const planetListElement = document.getElementById('planetList');
  planetListElement.classList.add('ogi-bg-bg-dark', 'ogi-gap-1', 'ogi-grid', 'ogi-p-1');

  while (planetListElement.hasChildNodes()) {
    const node = planetListElement.childNodes[0];

    if (node instanceof Element && node.getAttribute('id')) {
      const id = parseInt(node.getAttribute('id').replace('planet-', ''), 10);

      Data.planets[id].image = node.querySelector('.planetPic').src;

      if (node.querySelector('.moonlink')) {
        Data.planets[id].moon.image = node.querySelector('.icon-moon').src;
      }
    }

    planetListElement.removeChild(node);
  }

  planetList(planetListElement, Object.values(Data.planets));
}
