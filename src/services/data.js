const localStorageKey = 'test-data';

class Data {
  #json;

  constructor() {
    this.#json = JSON.parse(localStorage.getItem(localStorageKey)) || {
      component: undefined,
    };
  }

  get shipsData() {
    return this.#json?.shipsData;
  }

  set shipsData(shipsData) {
    this.#json.shipsData = shipsData;

    this.#save();
  }

  get planets() {
    return this.#json?.planets;
  }

  set planets(planets) {
    this.#json.planets = planets;

    this.#save();
  }

  get planetsLastUpdate() {
    return this.#json?.planetsLastUpdate;
  }

  set planetsLastUpdate(planetsLastUpdate) {
    this.#json.planetsLastUpdate = planetsLastUpdate;

    this.#save();
  }

  #save() {
    localStorage.setItem(localStorageKey, JSON.stringify(this.#json));
  }
}

export default new Data();
