

export default class Vehicle {
    #id;
    #licensePlate;
    #cargoMaxWeight;
    #cargoMaxWidth;  // x
    #cargoMaxHeight; // y
    #cargoMaxLength; // z
    /**
     * 
     * @param {{
     * id:number|null,
     * licensePlate:string,
     * cargoMaxWeight:number,
     * cargoMaxWidth:number,
     * cargoMaxHeight:number,
     * cargoMaxLength:number
     * }} data
     */
    constructor({
        id = null,
        licensePlate,
        cargoMaxWeight,
        cargoMaxWidth,
        cargoMaxHeight,
        cargoMaxLength
    }) {
        this.#id = id;
        this.#licensePlate = licensePlate;
        this.#cargoMaxWeight = cargoMaxWeight;
        this.#cargoMaxWidth = cargoMaxWidth;
        this.#cargoMaxHeight = cargoMaxHeight;
        this.#cargoMaxLength = cargoMaxLength;
    }
    /** @returns {number} */
    get id() {
        return this.#id;
    }
    /** @returns {string} */
    get licensePlate() {
        return this.#licensePlate;
    }
    /** @returns {number} */
    get cargoMaxWeight() {
        return this.#cargoMaxWeight;
    }
    /** @returns {number} */
    get cargoMaxWidth() {
        return this.#cargoMaxWidth;
    }
    /** @returns {number} */
    get cargoMaxHeight() {
        return this.#cargoMaxHeight;
    }
    /** @returns {number} */
    get cargoMaxLength() {
        return this.#cargoMaxLength;
    }
    
    /** @param {string} newLinsePlate*/
    set licensePlate(newLinsePlate) {
        this.#licensePlate = newLinsePlate;
    }
    /** @param {number} newCargoMaxWeight */
    set cargoMaxWeight(newCargoMaxWeight) {
        this.#cargoMaxWeight = newCargoMaxWeight;
    }
    /** @param {number} newCargoMaxWidth */
    set cargoMaxWidth(newCargoMaxWidth) {
        this.#cargoMaxWidth = newCargoMaxWidth;
    }
    /** @param {number} newCargoMaxHeight */
    set cargoMaxHeight(newCargoMaxHeight) {
        this.#cargoMaxHeight = newCargoMaxHeight;
    }
    /** @param {number} newCargoMaxLength */
    set cargoMaxLength(newCargoMaxLength) {
        return this.#cargoMaxLength = newCargoMaxLength;
    }
}
