import getConnectionPool from './db.js'
import Vehicle from '../models/vehicle.model.js';

const SQLS = {
    insert: "INSERT INTO vehicles (license_plate, max_weight, max_height, max_width, max_length) VALUES(?, ?, ?, ?, ?)",
    select: "SELECT id, license_plate, max_weight, max_height, max_width, max_length FROM vehicles",
    update: "UPDATE vehicles SET license_plate=?, max_weight=?, max_height=?, max_width=?, max_length=? WHERE id=?",
    delete: "DELETE FROM vehicles WHERE id=?;"
};

export class VehicleRepository {
    #db;
    constructor() {
        this.#db = getConnectionPool();
    }

    /**
     * @param {Vehicle} vehicle
     * @returns {Promise<number>}
     */
    async insert(vehicle) {

        if (vehicle == null)
            throw new Error('A vehicle was expected, but none was givem');

        const values = [
            vehicle.licensePlate,
            vehicle.cargoMaxWeight,
            vehicle.cargoMaxHeight,
            vehicle.cargoMaxWidth,
            vehicle.cargoMaxLength
        ];
        try {
            const [returnedData,] = await this.#db.execute(SQLS.insert, values);
            return returnedData.insertId;
        } //
        catch (e) {
            throw new Error(e);
        }
    }

    /**
     * @param {number} vehicleId
     * @returns {Promise<Vehicle>}
     */
    async selectById(vehicleId) {
        if (vehicleId == null)
            throw new Error('A vehicle id was expected, but none was givem');

        const values = [
            vehicleId
        ];
        try {
            const queryResult = await this.#db.execute(`${SQLS.select} WHERE id=?`, values);
            if (queryResult != null && queryResult[0] != null && queryResult[0][0]) {
                const vehicleData = queryResult[0][0];
                return new Vehicle({
                    id: vehicleData.id,
                    licensePlate: vehicleData.license_plate,
                    cargoMaxWeight: vehicleData.max_weight,
                    cargoMaxHeight: vehicleData.max_height,
                    cargoMaxWidth: vehicleData.max_width,
                    cargoMaxLength: vehicleData.max_length
                });
            }
            return null;
        } //
        catch (e) {
            throw new Error(e);
        }
    }

    async select() {
        try {
            const queryResult = await this.#db.execute(`${SQLS.select}`);
            if (queryResult != null && queryResult[0] != null && queryResult[0].length > 0) {
                const vehicles = [];
                for (const v of queryResult[0]) {
                    vehicles.push(new Vehicle({
                        id: v.id,
                        licensePlate: v.license_plate,
                        cargoMaxWeight: v.max_weight,
                        cargoMaxHeight: v.max_height,
                        cargoMaxWidth: v.max_width,
                        cargoMaxLength: v.max_length
                    }));
                }
                return vehicles;
            }
            return [];
        } //
        catch (e) {
            throw new Error(e);
        }
    }

    /**
     * @param {Vehicle} vehicle
     * @returns {Promise<void>}
     */
    async update(vehicle) {
        if (vehicle == null)
            throw new Error('A vehicle was expected, but none was givem');

        const values = [
            vehicle.licensePlate,
            vehicle.cargoMaxWeight,
            vehicle.cargoMaxHeight,
            vehicle.cargoMaxWidth,
            vehicle.cargoMaxLength,
            vehicle.id
        ];
        try {
            await this.#db.execute(SQLS.update, values);
        } //
        catch (e) {
            throw new Error(e);
        }
    }
    /**
     * @param {number} vehicle
     * @returns {Promise<void>}
     */
    async delete(vehicle) {

        if (vehicle == null)
            throw new Error('A vehicle was expected, but none was givem');

        const values = [
            vehicle
        ]; 
        try{
            await this.#db.execute(SQLS.delete, values);
        }
        catch( e) {
            throw new Error(e);
        }
    }
}
