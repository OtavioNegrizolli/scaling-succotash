import express from 'express';
import { VehicleController } from '../controller/vehicle.controller.js';
import { VehicleRepository } from '../database/vehicle.repository.js';

function getController() {
    const repository = new VehicleRepository();
    return new VehicleController(repository);
}

/** 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export async function handleVehiclePost(req, res) {
    try {
        const body = req.body;
        const id = await getController().create(body);
        if (typeof id == 'number')
            return res.status(201)
                .header('location', `/veiculos/${id}`)
                .json({ message: 'created' });
        return res.status(400)
            .json(id);
    } //
    catch (e) {
        console.log(e)
        return res.status(500)
            .json({
                message: 'Ocorreu um erro inexperado! Tente mais tarde'
            });
    }
}

/** 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export async function handleVehicleIndex(req, res) {
    try {
        const data = await getController().get();
        return res.status(200).json(data);
    } //
    catch (e) {
        return res.status(500).
            json({
                message: 'Ocorreu um erro inexperado! Tente mais tarde'
            });
    }
}

/** 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export async function handleVehicleUpdate(req, res) {
    try {
        const id = req.params['id'];
        const error = await getController().update(id, req.body);
        if (error != null)
            return res.status(400).json({ errors: error });
        return res.status(200).json({ ok: 'Done' });
    } //
    catch (e) {
        return res.status(500).
            json({
                message: 'Ocorreu um erro inexperado! Tente mais tarde'
            });
    }
}
/** 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export async function handleVehicleGet(req, res) {
    try {
        const id = req.params['id'];
        const data = await getController().getById(id);
        console.log(data.toJSON());
        if (data != null)
            return res.status(200).json(data);
        return res.status(404).end();
    } //
    catch (e) {
        return res.status(500)
            .json({
                message: 'Ocorreu um erro inexperado! Tente mais tarde'
            });
    }
}

/** 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export async function handleVehicleDelete(req, res) {
    console.log('aqui')
    try {
        const id = req.params['id'];
        await getController().delete(id);
        return res.status(204).end();
    } //
    catch (e) {
        return res.status(500)
            .json({
                message: 'Ocorreu um erro inexperado! Tente mais tarde'
            });
    }
}
