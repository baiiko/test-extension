import { createLink } from '../services/link.js';
import Data from '../services/data.js';

const planets = {};

const groupsKey = ['defence', 'research', 'resources', 'ships', 'station', 'storage'];

const planetTypes = Object.freeze({
  planet: 0,
  moon: 1,
});

function loadContent(planetType) {
  return fetch(
    `?${createLink({ page: 'standalone', component: 'empire', planetType })}`,
  )
    .then((rep) => rep.text())
    .then((content) => content.substring(content.indexOf('createImperiumHtml') + 47, content.indexOf('initEmpire') - 16));
}

async function loadPlanets() {
  let hasMoon = false;

  const content = await loadContent(planetTypes.planet);

  const { groups, planets: planetsList } = JSON.parse(content);

  planetsList.forEach((p) => {
    const planet = p;

    planets[planet.id] = {
      id: planet.id,
      name: planet.name,
      image: planet.image,
      coords: {
        galaxy: planet.galaxy,
        system: planet.system,
        position: planet.position,
      },
    };

    groupsKey.forEach((group) => {
      if (!planets[planet.id]?.[group]) planets[planet.id][group] = {};

      groups[group].forEach((groupElement) => {
        planets[planet.id][group][groupElement] = parseInt(planet[groupElement], 10);
      });
    });

    if (planet.moonID) hasMoon = true;
  });

  return hasMoon;
}

async function loadMoons() {
  const content = await loadContent(planetTypes.moon);

  const { groups, planets: moonsList } = JSON.parse(content);

  moonsList.forEach((m) => {
    const moon = m;

    planets[moon.planetID].moon = {
      id: moon.id,
      name: moon.name,
      image: moon.image,
    };

    groupsKey.forEach((group) => {
      if (!planets[moon.planetID].moon?.[group]) planets[moon.planetID].moon[group] = {};

      groups[group].forEach((groupElement) => {
        planets[moon.planetID].moon[group][groupElement] = parseInt(moon[groupElement], 10);
      });
    });
  });
}

async function load() {
  const hasMoon = await loadPlanets();

  if (hasMoon) {
    await loadMoons();
  }
}

export default async function empire() {
  const needsToEmpireLoad = () => {
    const checkDate = new Date();
    checkDate.setTime(checkDate.getTime() - 5 * 60 * 1000);

    return !Data.planetsLastUpdate || new Date(Data.planetsLastUpdate) < checkDate;
  };

  if (needsToEmpireLoad()) {
    await load();
    Data.planets = planets;
    Data.planetsLastUpdate = new Date();
  }
}
