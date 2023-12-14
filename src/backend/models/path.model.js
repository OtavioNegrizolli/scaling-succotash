export default class Path {
    #id;
    #name;
    #origin;
    #destination;  // x
    #distance;  // x
    #avaregeTime;  // x
    /** 
     * @param {{
     * id:number|null,
     * name:string,
     * origin:string,
     * destination:string
     * distance:number
     * avaregeTime:number
     * }} data
     */
    constructor({
        id = null,
        name,
        origin,
        destination,
        distance,
        avaregeTime
    }) {
        this.#id = id;
        this.#name = name;
        this.#origin = origin;
        this.#destination = destination;
        this.#distance = distance;
        this.#avaregeTime = avaregeTime;
    }

    /** @returns {number} */
    get id() {
        return this.#id;
    }

    /** @returns {string} */
    get name() {
        return this.#name;
    }
    /** @param {string} newName*/
    set name(newName) {
        this.#name = newName;
    }

    /** @returns {string} */
    get origin() {
        return this.#origin;
    }
    /** @param {string} newOrigin*/
    set origin(newOrigin) {
        this.#origin = newOrigin;
    }

    /** @returns {string} */
    get destination() {
        return this.#destination;
    }
    /** @param {string} newDestination */
    set destination(newDestination) {
        this.#destination = newDestination;
    }

    /** @returns {number} */
    get distance() {
        return this.#distance;
    }
    /** @param {number} newDistance */
    set distance(newDistance) {
        this.#distance = newDistance;
    }

    /** @returns {number} */
    get avaregeTime() {
        return this.#avaregeTime;
    }
    /** @param {number} newAvaregeTime */
    set avaregeTime(newAvaregeTime) {
        this.#avaregeTime = newAvaregeTime;
    }

    /** @return {{[prop:string]:string}|null} */
    amIValid() {
        const errors = {};

        if (this.#name == null || this.#name.length == 0)
            errors['name'] = 'Obrigatória!';
        else if (this.#name.length < 3 || this.#name.length > 50)
            errors['name'] = 'O nome deve ter entre 3 e 50 caracteres!';

        if (this.#origin == null || this.#origin.length == 0)
            errors['origin'] = 'Obrigatório!';
        else if (this.#origin.length < 3 || this.#origin.length > 50)
            errors['origin'] = 'Nome da cidade deve ter entre 3 e 50 caracters';

        if (this.#destination == null || this.#destination.length == 0)
            errors['destination'] = 'Obrigatório!';
        else if (this.#destination.length < 3 || this.#destination.length > 50)
            errors['destination'] = 'Nome da cidade deve ter entre 3 e 50 caracters';

        if (this.#distance == null)
            errors['distance'] = 'Obrigatório!';
        else if (this.#distance <= 0)
            errors['distance'] = 'Deve ser superior a 0 (zero)!';
        
        if (this.#avaregeTime == null)
            errors['avaregeTime'] = 'Obrigatório!';
        else if (this.#avaregeTime <= 0)
            errors['avaregeTime'] = 'Deve ser superior a 0 (zero)!';

        return Object.keys(errors).length > 0 ? errors : null;
    }

    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            origin: this.#origin,
            destination: this.#destination,
            distance: this.#distance,
            avaregeTime: this.#avaregeTime
        };
    }
}
