class Data {
    _json;
    constructor() {
        this._json = JSON.parse(localStorage.getItem("test-data")) || {
            component: undefined
        };
    }

    set component(component) {
        this._json.component = component;

        this.#save();
    }

    #save() {
        localStorage.setItem("test-data", JSON.stringify(this._json));
    }
}

export default new Data();
