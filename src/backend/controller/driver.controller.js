import Driver from '../models/driver.model.js';
import DriverUpdateCmd from '../cmd/driver-update.cmd.js';
import DriverCreateCmd from '../cmd/driver-create.cmd.js';
import DriverQuery from '../query/driver.query.js';

import { FailedOp } from '../utils/failed-op.js';

export class DriverController {
    #repository;
    /**
     * 
     * @param {{
     * insert:function(Driver):Promise<number>,
     * update:function(Driver):Promise<void>,
     * delete:function(Driver):Promise<void>,
     * select:function(any):Promise<Driver[]>,
     * selectById:function(number):Promise<Driver|null>,
     * }} repository 
     */
    constructor(repository) {
        this.#repository = repository;
    }

    /** 
     * @param {DriverCreateCmd} createCmd 
     * @returns {Promise<number|FailedOp>}
     */
    async create(createCmd) {
        if (createCmd == null)
            return new FailedOp('Comando vazio');

        const driver = new Driver({
            name: createCmd.name,
            cnh: createCmd.cnh,
            cpf: createCmd.cpf
        });

        const errors = driver.amIValid();
        if (errors != null)
            return new FailedOp(errors);

        try {
            const generatedId = await this.#repository.insert(driver);
            return generatedId;
        }
        catch (e) {
            console.log(e);
            return new Error(e);
        }
    }

    /**
     * @param {number} driverId
     * @returns {Promise<Driver|null>}
     */
    async getById(driverId) {
        const driver = await this.#repository.selectById(driverId);
        return driver;
    }

    /**
     * @param {DriverQuery} query
     * @returns {Promise<Driver[]>}
     */
    async get(query) {
        const driver = await this.#repository.select();
        return driver;
    }

    /** 
     * @param {number} DriverId
     * @param {DriverUpdateCmd} updateCmd 
     * @returns {Promise<FailedOp|null>}
     */
    async update(DriverId, updateCmd) {

        if (updateCmd == null)
            return new FailedOp('Comando vazio');

        const driver = await this.#repository.selectById(DriverId);
        if (driver == null) {
            return new FailedOp({ 'error': 'Motorista não encontrado' });
        }
        // todos os dados são obrigatórios
        driver.name = updateCmd.name || driver.name;
        driver.cnh = updateCmd.cnh || driver.cnh;

        const errors = driver.amIValid();
        if (errors != null)
            return new FailedOp(errors);

        try {
            await this.#repository.update(driver);
        }
        catch (e) {
            console.log(e);
            return new FailedOp('A error happend while creating driver');
        }
    }

    /** 
     * @param {number} id 
     * @returns {Promise<null>}
     */
    async delete(id) {
        try {
            await this.#repository.delete(id);
        }
        catch (e) {
            console.log(e);
            return new FailedOp('A error happend while creating driver');
        }
    }
}
