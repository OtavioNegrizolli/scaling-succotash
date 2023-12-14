

export default class Vehicle {
    #id;
    #licensePlate;
    #cargoMaxWeight;
    #cargoMaxWidth;  // x
    #cargoMaxHeight; // y
    #cargoMaxLength; // z

    /** 
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
    /** @param {string} newLinsePlate*/
    set licensePlate(newLinsePlate) {
        this.#licensePlate = newLinsePlate;
    }

    /** @returns {number} */
    get cargoMaxWeight() {
        return this.#cargoMaxWeight;
    }
    /** @param {number} newCargoMaxWeight */
    set cargoMaxWeight(newCargoMaxWeight) {
        this.#cargoMaxWeight = newCargoMaxWeight;
    }

    /** @returns {number} */
    get cargoMaxWidth() {
        return this.#cargoMaxWidth;
    }
    /** @param {number} newCargoMaxWidth */
    set cargoMaxWidth(newCargoMaxWidth) {
        this.#cargoMaxWidth = newCargoMaxWidth;
    }

    /** @returns {number} */
    get cargoMaxHeight() {
        return this.#cargoMaxHeight;
    }
    /** @param {number} newCargoMaxHeight */
    set cargoMaxHeight(newCargoMaxHeight) {
        this.#cargoMaxHeight = newCargoMaxHeight;
    }

    /** @returns {number} */
    get cargoMaxLength() {
        return this.#cargoMaxLength;
    }
    /** @param {number} newCargoMaxLength */
    set cargoMaxLength(newCargoMaxLength) {
        return this.#cargoMaxLength = newCargoMaxLength;
    }

    /** @return {{[prop:string]:string}|null} */
    amIValid() {

        const errors = {};

        if (this.#licensePlate == null)
            errors['licensePlate'] = 'Obrigatória!';
        else if (this.#licensePlate.length != 7)
            errors['licensePlate'] = 'O número da placa tem 7 caracteres!';

        if (this.#cargoMaxWeight == null)
            errors['maxWeight'] = 'Obrigatório!';
        else if (this.#cargoMaxWeight <= 0)
            errors['maxWeight'] = 'Deve ser superior a 0 (zero)!';

        if (this.#cargoMaxWidth == null)
            errors['maxWidth'] = 'Obrigatório!';
        else if (this.#cargoMaxWidth <= 0)
            errors['maxWidth'] = 'Deve ser superior a 0 (zero)!';

        if (this.#cargoMaxHeight == null)
            errors['maxHeight'] = 'Obrigatório!';
        else if (this.#cargoMaxHeight <= 0)
            errors['maxHeight'] = 'Deve ser superior a 0 (zero)!';

        if (this.#cargoMaxLength == null)
            errors['maxLength'] = 'Obrigatório!';
        else if (this.#cargoMaxLength <= 0)
            errors['maxLength'] = 'Deve ser superior a 0 (zero)!';

        if (Object.keys(errors).length > 0)
            return errors;

        return null;
    }
    
    toJSON() {
        return {
            id: this.#id,
            licensePlate: this.#licensePlate,
            maxWeight: this.#cargoMaxWeight,
            maxWidth : this.#cargoMaxWidth,
            maxHeight: this.#cargoMaxHeight,
            maxLength: this.#cargoMaxLength,
        }
    }
}
