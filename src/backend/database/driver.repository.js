import getConnectionPool from './db.js'
import Driver from '../models/driver.model.js';

const SQLS = {
    insert: "INSERT INTO drivers (name, cnh, cpf) VALUES( ?, ?, ?)",
    select: "SELECT id, name, cnh, cpf FROM drivers",
    update: "UPDATE drivers SET name=?, cnh=?, cpf=? WHERE id=?",
    delete: "DELETE FROM drivers WHERE id=?"
};

export class DriverRepository {
    #db;
    constructor() {
        this.#db = getConnectionPool();
    }

    /**
     * @param {Driver} driver
     * @returns {Promise<number>}
     */
    async insert(driver) {

        if (driver == null)
            throw new Error('A driver was expected, but none was givem');

        const values = [
            driver.name,
            driver.cnh,
            driver.cpf
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
     * @param {number} driverId
     * @returns {Promise<Driver>}
     */
    async selectById(driverId) {
        if (driverId == null)
            throw new Error('A driver id was expected, but none was givem');

        const values = [
            driverId
        ];
        try {
            const queryResult = await this.#db.execute(`${SQLS.select} WHERE id=?`, values);
            if (queryResult != null && queryResult[0] != null && queryResult[0][0]) {
                const vehicleData = queryResult[0][0];
                return new Driver({
                    id: vehicleData.id,
                    name: vehicleData.name,
                    cnh: vehicleData.cnh,
                    cpf: vehicleData.cpf
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
                    vehicles.push(new Driver({
                        id: v.id,
                        name: v.name,
                        cnh: v.cnh,
                        cpf: v.cpf
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
     * @param {Driver} driver
     * @returns {Promise<void>}
     */
    async update(driver) {
        if (driver == null)
            throw new Error('A driver was expected, but none was givem');

        const values = [
            driver.name,
            driver.cnh,
            driver.cpf,
            driver.id
        ];
        try {
            await this.#db.execute(SQLS.update, values);
        } //
        catch (e) {
            throw new Error(e);
        }
    }
    /**
     * @param {number} driver
     * @returns {Promise<void>}
     */
    async delete(driver) {

        if (driver == null)
            throw new Error('A driver was expected, but none was givem');

        const values = [
            driver
        ]; 
        try{
            await this.#db.execute(SQLS.delete, values);
        }
        catch( e) {
            throw new Error(e);
        }
    }
}
