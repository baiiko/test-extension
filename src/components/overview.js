import Data from '../services/data.js';
import { createLink, redirect } from '../services/link.js';

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
