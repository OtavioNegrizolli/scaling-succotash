import Vehicle from '../models/vehicle.model.js';
import VehicleUpdateCmd from '../cmd/vehicle-update.cmd.js';
import VehicleCreateCmd from '../cmd/vehicle-create.cmd.js';
import VehicleQuery from '../query/vehicle.query.js';

import { FailedOp } from '../utils/failed-op.js';

export class VehicleController {
    #repository;
    /**
     * 
     * @param {{
     * insert:function(Vehicle):Promise<number>,
     * update:function(Vehicle):Promise<void>,
     * delete:function(Vehicle):Promise<void>,
     * select:function(any):Promise<Vehicle[]>,
     * selectById:function(number):Promise<Vehicle|null>,
     * }} repository 
     */
    constructor(repository) {
        this.#repository = repository;
    }

    /** 
     * @param {VehicleCreateCmd} createCmd 
     * @returns {Promise<number|FailedOp>}
     */
    async create(createCmd) {
        if (createCmd == null)
            return new FailedOp('Comando vazio');

        const vehicle = new Vehicle({
            licensePlate: createCmd.licensePlate,
            cargoMaxWeight: createCmd.maxWeight,
            cargoMaxWidth: createCmd.maxWidth,
            cargoMaxHeight: createCmd.maxHeight,
            cargoMaxLength: createCmd.maxLength
        });

        const errors = vehicle.amIValid();
        if (errors != null)
            return new FailedOp(errors);

        try {
            const generatedId = await this.#repository.insert(vehicle);
            return generatedId;
        }
        catch (e) {
            console.log(e);
            return new FailedOp('A error happend while creating vehicle');
        }
    }
    /**
     * @param {number} vehicleId
     * @returns {Promise<Vehicle|null>}
     */
    async getById(vehicleId) {
        const vehicle = await this.#repository.selectById(vehicleId);
        return vehicle;
    }
    /**
     * @param {VehicleQuery} query
     * @returns {Promise<Vehicle[]>}
     */
    async get(query) {
        const vehicle = await this.#repository.select();
        return vehicle;
    }

    /** 
     * @param {number} vehicleId
     * @param {VehicleUpdateCmd} updateCmd 
     * @returns {Promise<FailedOp|null>}
     */
    async update(vehicleId, updateCmd) {

        if (updateCmd == null)
            return new FailedOp('Comando vazio');

        const vehicle = await this.#repository.selectById(vehicleId);
        if (vehicle == null) {
            return new FailedOp({ 'error': 'Veículo não encontrado' });
        }
        // todos os dados são obrigatórios
        vehicle.licensePlate = updateCmd.licensePlate || vehicle.licensePlate;
        vehicle.cargoMaxWeight = updateCmd.maxWeight || vehicle.cargoMaxWeight;
        vehicle.cargoMaxWidth = updateCmd.maxWidth || vehicle.cargoMaxWidth;
        vehicle.cargoMaxHeight = updateCmd.maxHeight || vehicle.cargoMaxHeight;
        vehicle.cargoMaxLength = updateCmd.maxLength || vehicle.cargoMaxLength;

        const errors = vehicle.amIValid();
        if (errors != null)
            return new FailedOp(errors);

        try {
            await this.#repository.update(vehicle);
        }
        catch (e) {
            console.log(e);
            return new FailedOp('A error happend while creating vehicle');
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
            return new FailedOp('A error happend while creating vehicle');
        }
    }
}
