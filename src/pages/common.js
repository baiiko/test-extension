import Data from '../services/data.js';
import { createLink, redirect } from '../services/link.js';
import PlanetList from '../components/planet-list.js';

if (!Data.shipsData) {
  redirect({
    page: 'ingame',
    component: 'fleetdispatch',
    redirect: `?${createLink({
      page: 'ingame',
      component: 'overview',
    })}`,
  });
}

PlanetList();
