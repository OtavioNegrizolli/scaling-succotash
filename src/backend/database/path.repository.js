import getConnectionPool from './db.js'
import Path from '../models/path.model.js';

const SQLS = {
    insert: "INSERT INTO paths (id, name, origin, destination, distance, average_time) VALUES(?, ?, ?, ?, ?)",
    select: "SELECT id, name, origin, destination, distance, average_time FROM paths ",
    update: "UPDATE paths SET name=?, origin=?, destination=?, distance=?, average_time=? WHERE id=?",
    delete: "DELETE FROM paths WHERE id=?"
};

export class PathRepository {
    #db;
    constructor() {
        this.#db = getConnectionPool();
    }

    /**
     * @param {Path} path
     * @returns {Promise<number>}
     */
    async insert(path) {

        if (path == null)
            throw new Error('A path was expected, but none was givem');

        const values = [
            path.name,
            path.origin,
            path.destination,
            path.distance,
            path.avaregeTime
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
     * @param {number} pathId
     * @returns {Promise<Path|null>}
     */
    async selectById(pathId) {
        if (pathId == null)
            throw new Error('A path id was expected, but none was givem');

        const values = [
            pathId
        ];
        try {
            const queryResult = await this.#db.execute(`${SQLS.select} WHERE id=?`, values);
            if (queryResult != null && queryResult[0] != null && queryResult[0][0]) {
                const pathData = queryResult[0][0];
                return new Path({
                    id: pathData.id,
                    name: pathData.name,
                    origin: pathData.origin,
                    destination: pathData.destination,
                    distance: pathData.distance,
                    avaregeTime: pathData.average_time
                });
            }
            return null;
        } //
        catch (e) {
            throw new Error(e);
        }
    }

    /**
    * @param {number} pathId
    * @returns {Promise<Path[]>}
    */
    async select() {
        try {
            const queryResult = await this.#db.execute(`${SQLS.select}`);
            if (queryResult != null && queryResult[0] != null && queryResult[0].length > 0) {
                const paths = [];
                for (const v of queryResult[0]) {
                    paths.push(new Path({
                        id: pathData.id,
                        name: pathData.name,
                        origin: pathData.origin,
                        destination: pathData.destination,
                        distance: pathData.distance,
                        avaregeTime: pathData.average_time
                    }));
                }
                return paths;
            }
            return [];
        } //
        catch (e) {
            throw new Error(e);
        }
    }

    /**
     * @param {Path} path
     * @returns {Promise<void>}
     */
    async update(path) {
        if (path == null)
            throw new Error('A path was expected, but none was givem');

        const values = [
            path.name,
            path.origin,
            path.destination,
            path.distance,
            path.avaregeTime,
            path.id
        ];
        try {
            await this.#db.execute(SQLS.update, values);
        } //
        catch (e) {
            throw new Error(e);
        }
    }

    /**
     * @param {number} pathId
     * @returns {Promise<void>}
     */
    async delete(pathId) {

        if (pathId == null)
            throw new Error('A path was expected, but none was givem');

        const values = [
            pathId
        ];
        try {
            await this.#db.execute(SQLS.delete, values);
        }
        catch (e) {
            throw new Error(e);
        }
    }
}
