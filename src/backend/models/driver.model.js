import { validarCPF } from "../utils/utils.js";

export default class Driver {
    #id;
    #name;
    #cpf;
    #cnh;  // x
    /** 
     * @param {{
     * id:number|null,
     * name:string,
     * cpf:string,
     * cnh:string
     * }} data
     */
    constructor({
        id = null,
        name,
        cpf,
        cnh,
    }) {
        this.#id = id;
        this.#name = name;
        this.#cpf = cpf?.replaceAll(/[\W ]/ig, '');
        this.#cnh = cnh;
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
    get cpf() {
        return this.#cpf;
    }

    /** @returns {string} */
    get cnh() {
        return this.#cnh;
    }
    /** @param {string} newCnh */
    set cnh(newCnh) {
        this.#cnh = newCnh;
    }

    amIValid() {
        const errors = { };

        if (this.#name == null || this.#name.length == 0)
            errors['name'] = 'Obrigatório';
        else if (this.#name.length < 3 || this.#name.length > 50)
            errors['name'] = 'Entre 3 e 50 caracteres apenas';

        if ( this.#cpf == null || this.#cpf.trim().length == 0)
            errors['cpf'] = 'Obrigatório';
        else if ( !validarCPF(this.#cpf))
            errors['cpf'] = 'Inválido';

        if ( this.#cnh == null || this.#cnh.trim().length == 0) 
            errors['cnh'] = 'Obrigatória';
        else if (['A', 'B', 'C', 'D', 'E', 'A/B', 'A/C', 'A/D', 'A/E'].indexOf(this.#cnh.toUpperCase()) == -1)
            errors['cnh'] = 'Letra da CNH não reconhecida';

        return Object.keys(errors).length > 0 ? errors : null;
    }

    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            cpf: this.#cpf,
            cnh: this.#cnh
        }
    }
}
