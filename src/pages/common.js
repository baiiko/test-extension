import Data from '../services/data.js';
import { createLink, redirect } from '../services/link.js';
import planetList from '../components/planet-list.js';
import menu from '../components/menu.js';

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

document.getElementById('pageContent').classList.add('!ogi-w-max');
document.getElementById('top').classList.add('!ogi-bg-no-repeat');
document.getElementById('right').classList.add('!ogi-w-72');
document.querySelectorAll('#planetbarcomponent, #rechts, #myPlanets').forEach((div) => {
  div.classList.add('!ogi-w-full');
});

menu();
planetList();
