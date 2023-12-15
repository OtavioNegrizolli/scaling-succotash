import Path from '../models/path.model.js';
import PathUpdateCmd from '../cmd/path-update.cmd.js';
import PathCreateCmd from '../cmd/path-create.cmd.js';
import PathQuery from '../query/path.query.js';

import { FailedOp } from '../utils/failed-op.js';

export class PathController {
    #repository;
    /**
     * 
     * @param {{
     *   insert:function(Path):Promise<number>,
     *   update:function(Path):Promise<void>,
     *   delete:function(Path):Promise<void>,
     *   select:function(any):Promise<Path[]>,
     *   selectById:function(number):Promise<Path|null>,
     * }} repository 
     */
    constructor(repository) {
        this.#repository = repository;
    }

    /** 
     * @param {PathCreateCmd} createCmd 
     * @returns {Promise<number|FailedOp>}
     */
    async create(createCmd) {
        if (createCmd == null)
            return new FailedOp('Comando vazio');

        const path = new Path({
            name: createCmd.name,
            origin: createCmd.origin,
            destination: createCmd.destination,
            distance: createCmd.distance,
            avaregeTime: createCmd.avaregeTime
        });

        const errors = path.amIValid();
        if (errors != null)
            return new FailedOp(errors);

        try {
            const generatedId = await this.#repository.insert(path);
            return generatedId;
        }
        catch (e) {
            console.log(e);
            return new FailedOp('A error happend while creating path');
        }
    }

    /**
     * @param {number} pathId
     * @returns {Promise<Path|null>}
     */
    async getById(pathId) {
        const path = await this.#repository.selectById(pathId);
        return path;
    }

    /**
     * @param {VehicleQuery} query
     * @returns {Promise<Path[]>}
     */
    async get(query) {
        const path = await this.#repository.select();
        return path;
    }

    /** 
     * @param {number} pathId
     * @param {PathUpdateCmd} updateCmd 
     * @returns {Promise<FailedOp|null>}
     */
    async update(pathId, updateCmd) {

        if (updateCmd == null)
            return new FailedOp('Comando vazio');

        const path = await this.#repository.selectById(pathId);
        if (path == null) {
            return new FailedOp({ 'error': 'Veículo não encontrado' });
        }
        // todos os dados são obrigatórios
        path.name = updateCmd.name || path.name;
        path.origin = updateCmd.origin || path.origin;
        path.destination = updateCmd.destination || path.destination;
        path.distance = updateCmd.distance || path.distance;
        path.avaregeTime = updateCmd.avaregeTime || path.avaregeTime;

        const errors = path.amIValid();
        if (errors != null)
            return new FailedOp(errors);

        try {
            await this.#repository.update(path);
        }
        catch (e) {
            console.log(e);
            return new FailedOp('A error happend while creating path');
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
            return new FailedOp('A error happend while creating path');
        }
    }
}
