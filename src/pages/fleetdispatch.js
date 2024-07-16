import Data from '../services/data.js';

// eslint-disable-next-line no-undef
if (fleetDispatcher) {
  // eslint-disable-next-line no-undef
  Data.shipsData = fleetDispatcher.fleetHelper.shipsData;
}

const url = new URL(window.location.href);

if (url.searchParams.has('redirect')) {
  window.location = url.searchParams.get('redirect');
}

console.log('Fleetdispatch component display');
