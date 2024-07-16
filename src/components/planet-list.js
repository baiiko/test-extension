import empire from './empire.js';
import Data from '../services/data.js';

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

  Object.values(Data.planets).forEach((planet) => {
    const rowElement = document.createElement('div');
    rowElement.classList.add('ogi-grid', 'ogi-justify-items-center', 'ogi-grid-cols-2', 'ogi-gap-1');

    const planetElement = document.createElement('div');
    planetElement.classList.add('ogi-grid', 'ogi-justify-items-center', 'ogi-place-items-center', 'ogi-grid-cols-2', 'ogi-p-1', 'ogi-rounded', 'ogi-bg-gradient-to-r', 'ogi-from-gradient-from', 'ogi-to-gradient-to', 'ogi-shadow-planet');

    const planetImg = document.createElement('img');
    planetImg.classList.add('ogi-p-1');
    planetImg.src = planet.image;

    const cssColorByResource = {
      metal: 'ogi-text-metal',
      crystal: 'ogi-text-crystal',
      deuterium: 'ogi-text-deuterium',
    };

    const addResourcesElement = (resources) => {
      const resourcesElement = document.createElement('div');
      resourcesElement.classList.add('ogi-w-3/6');

      const addResourceContent = (resourceKey) => {
        const elementResource = document.createElement('div');
        elementResource.classList.add(cssColorByResource?.[resourceKey.toLowerCase()], 'ogi-truncate');
        elementResource.textContent = resources[resourceKey];

        return elementResource;
      };

      resourcesElement.appendChild(addResourceContent('metal'));
      resourcesElement.appendChild(addResourceContent('crystal'));
      resourcesElement.appendChild(addResourceContent('deuterium'));

      return resourcesElement;
    };

    planetElement.appendChild(planetImg);
    planetElement.appendChild(addResourcesElement(planet.resources));
    rowElement.appendChild(planetElement);

    if (planet?.moon?.id) {
      rowElement.classList.add();

      const moonElement = document.createElement('div');
      moonElement.classList.add('ogi-grid', 'ogi-justify-items-center', 'ogi-place-items-center', 'ogi-grid-cols-2', 'ogi-p-1', 'ogi-rounded', 'ogi-bg-gradient-to-r', 'ogi-from-gradient-from', 'ogi-to-gradient-to', 'ogi-shadow-planet');

      const moonImg = document.createElement('img');
      moonImg.classList.add('ogi-p-1');
      moonImg.src = planet.moon.image;

      moonElement.appendChild(moonImg);
      moonElement.appendChild(addResourcesElement(planet.moon.resources));
      rowElement.appendChild(moonElement);
    }

    planetListElement.appendChild(rowElement);
  });
}
