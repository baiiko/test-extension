import { redirect } from '../../services/link.js';
import toFormattedNumber from '../../services/numbers.js';
import lifeForms from '../../services/enum/life-forms.js';

const currentPlanet = parseInt(document.querySelector('meta[name="ogame-planet-id"]').getAttribute('content'), 10);

const searchParams = new URLSearchParams(window.location.search);
searchParams.delete('cp');

function createRowElement() {
  const rowElement = document.createElement('div');
  rowElement.classList.add('ogi-flex', 'ogi-justify-items-center', 'ogi-gap-1');

  return rowElement;
}

function planetContentInfoLeft(planet, isMoon) {
  const element = document.createElement('div');
  element.classList.add('ogi-grid', 'ogi-justify-items-center', 'ogi-place-items-center', 'ogi-basis-7/12', 'ogi-gap-1');

  if (!isMoon) {
    const infoName = document.createElement('div');
    infoName.classList.add('ogi-text-white');
    infoName.textContent = planet.name;
    element.appendChild(infoName);

    const infoCoords = document.createElement('div');
    infoCoords.classList.add('ogi-text-coords');
    infoCoords.textContent = Object.values(planet.coords).join(':');
    element.appendChild(infoCoords);
  }

  return element;
}

function planetContentInfoRight(planet, isMoon) {
  const element = document.createElement('div');
  element.classList.add(
    'ogi-h-full',
    'ogi-grid',
    'ogi-justify-items-center',
    'ogi-place-items-center',
    'ogi-basis-5/12',
  );

  if (!isMoon) {
    const planetLifeform = document.createElement('div');

    const bgLifeForm = {
      [`${lifeForms.human}`]: '!ogi-bg-lifeform1',
      [`${lifeForms.rocktal}`]: '!ogi-bg-lifeform2',
      [`${lifeForms.mecas}`]: '!ogi-bg-lifeform3',
      [`${lifeForms.kaelesh}`]: '!ogi-bg-lifeform4',
    };

    planetLifeform.classList.add(
      'lifeform-item-icon',
      '!ogi-h-9',
      '!ogi-w-9',
      bgLifeForm[planet.lifeform],
      'ogi-opacity-40',
    );

    element.appendChild(planetLifeform);
  }

  const planetImg = document.createElement('img');
  planetImg.classList.add(
    'ogi-absolute',
    'ogi-rounded-full',
    !isMoon ? '-ogi-right-2' : '-ogi-right-0.5',
    !isMoon ? '-ogi-bottom-2' : '-ogi-bottom-0.5',
  );

  if (planet.id !== currentPlanet) {
    planetImg.classList.add('hover:ogi-shadow-planet-img');
  }

  planetImg.src = planet.image;
  element.appendChild(planetImg);

  if (planet.attack) {
    const planetAlert = document.createElement('div');
    planetAlert.classList.add(
      'ogi-absolute',
      'ogi-w-full',
      'ogi-h-full',
      'ogi-rounded-full',
      'ogi-animate-ping',
      'ogi-left-0',
      'ogi-top-0',
      'ogi-bg-red-700',
      'ogi-opacity-70',
    );

    element.appendChild(planetAlert);
  }

  const planetTimer = document.createElement('div');
  planetTimer.classList.add('ogi-absolute', 'ogi-right-0.5', 'ogi-top-0.5', 'ogi-w-1', 'ogi-h-1', 'ogi-bg-red-700', 'ogi-rounded-full');
  planetTimer.src = planet.image;
  element.appendChild(planetTimer);

  return element;
}

function planetContentInfo(planet, isMoon) {
  const element = document.createElement('div');
  element.classList.add(
    'ogi-h-full',
    'ogi-cursor-pointer',
    'ogi-relative',
    'ogi-overflow-hidden',
    'ogi-p-1',
    'ogi-flex',
    'ogi-basis-2/3',
    'ogi-justify-items-center',
    'ogi-place-items-center',
    'ogi-rounded',
    'ogi-bg-gradient-to-r',
    'ogi-to-gradient-to',
    'ogi-shadow-planet-content',
  );

  if (currentPlanet === planet.id) {
    element.classList.add('ogi-from-gradient-current-from');
  } else {
    element.classList.add('ogi-from-gradient-from', 'hover:ogi-from-gradient-hover-from');
  }

  element.addEventListener('click', () => {
    searchParams.append('cp', planet.id);
    redirect(searchParams.entries());
  });

  element.appendChild(planetContentInfoLeft(planet, isMoon));
  element.appendChild(planetContentInfoRight(planet, isMoon));

  return element;
}

function planetResources(resources, isMoon, storage = undefined) {
  const cssColorByResource = {
    metal: 'ogi-text-metal',
    crystal: 'ogi-text-crystal',
    deuterium: 'ogi-text-deuterium',
  };

  const element = document.createElement('div');
  element.classList.add('ogi-p-1', 'ogi-w-full', 'ogi-basis-1/3');

  const addResourceContent = (resourceKey) => {
    const elementResource = document.createElement('div');

    let textColor = cssColorByResource?.[resourceKey.toLowerCase()];

    if (!isMoon && storage && storage?.[`${resourceKey.toLowerCase()}Storage`] <= resources[resourceKey]) {
      textColor = 'ogi-text-red-700';
    }

    elementResource.classList.add(textColor, 'ogi-truncate', 'ogi-text-right');
    elementResource.textContent = toFormattedNumber(resources[resourceKey], null, true);

    return elementResource;
  };

  element.appendChild(addResourceContent('metal'));
  element.appendChild(addResourceContent('crystal'));
  element.appendChild(addResourceContent('deuterium'));

  return element;
}

function planetContent(planet, isMoon = false) {
  const element = document.createElement('div');
  element.classList.add(
    'ogi-flex',
    (!isMoon ? 'ogi-basis-7/12' : 'ogi-basis-5/12'),
    'ogi-w-full',
    'ogi-justify-items-center',
    'ogi-place-items-center',
  );

  element.appendChild(planetContentInfo(planet, isMoon));
  element.appendChild(planetResources(planet.resources, isMoon, planet.storage));

  return element;
}

export default (parentElement, planets) => {
  planets.forEach((planet) => {
    const rowElement = createRowElement();

    rowElement.appendChild(planetContent(planet));
    if (planet?.moon?.id) {
      rowElement.appendChild(planetContent(planet.moon, true));
    }

    parentElement.appendChild(rowElement);
  });
};
