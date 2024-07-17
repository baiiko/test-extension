import { createLink } from '../services/link.js';
import Data from '../services/data.js';
import lifeForms from '../services/enum/life-forms.js';

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

function getLifeForm(groups, planet) {
  const key = Object.keys(lifeForms).find((lifeformKey) => {
    const groupBuilding = groups[`lifeform${lifeForms[lifeformKey]}buildings`];

    return Object.values(groupBuilding).find(
      (groupBuildingElement) => planet[groupBuildingElement] > 0,
    );
  });

  return lifeForms?.[key] || undefined;
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

    planets[planet.id].lifeform = getLifeForm(groups, planet);

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

  const currentPlanet = parseInt(document.querySelector('meta[name="ogame-planet-id"]').getAttribute('content'), 10);
  const currentPlanetType = document.querySelector('meta[name="ogame-planet-type"]').getAttribute('content');

  if (currentPlanetType === 'moon') {
    Object.values(Data.planets).forEach((planet) => {
      if (planet?.moon?.id !== currentPlanet) return;

      Data.planets[planet.id].moon.resources = {
        metal: parseInt(document.getElementById('resources_metal').getAttribute('data-raw'), 10),
        crystal: parseInt(document.getElementById('resources_crystal').getAttribute('data-raw'), 10),
        deuterium: parseInt(document.getElementById('resources_deuterium').getAttribute('data-raw'), 10),
      };
    });
  } else {
    Data.planets[currentPlanet].resources = {
      metal: parseInt(document.getElementById('resources_metal').getAttribute('data-raw'), 10),
      crystal: parseInt(document.getElementById('resources_crystal').getAttribute('data-raw'), 10),
      deuterium: parseInt(document.getElementById('resources_deuterium').getAttribute('data-raw'), 10),
    };
  }

  Data.planets = { ...Data.planets };
}
