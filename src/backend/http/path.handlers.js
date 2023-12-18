import express from 'express';
import { PathController } from '../controller/path.controller.js';
import { PathRepository } from '../database/path.repository.js';

function getController() {
    const repository = new PathRepository();
    return new PathController(repository);
}

/** 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export async function handlePathPost(req, res) {
    try {
        const body = req.body;
        const id = await getController().create(body);
        if (typeof id == 'number')
            return res.status(201)
                .header('location', `/trajetos/${id}`)  
                .json({ message: 'created' });
        return res.status(400)
            .json(id);
    } //
    catch (e) {
        console.error(e);
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
export async function handlePathIndex(req, res) {
    try {
        const data = await getController().get();
        return res.status(200).json(data);
    } //
    catch (e) {
        console.error(e);
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
export async function handlePathUpdate(req, res) {
    try {
        const id = req.params['id'];
        const error = await getController().update(id, req.body);
        if (error != null)
            return res.status(400).json({ errors: error });
        return res.status(200).json({ ok: 'Done' });
    } //
    catch (e) {
        console.error(e);
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
export async function handlePathGet(req, res) {
    try {
        const id = req.params['id'];
        const data = await getController().getById(id);
        if (data != null)
            return res.status(200).json(data);
        return res.status(404).end();
    } //
    catch (e) {
        console.error(e);
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
export async function handlePathDelete(req, res) {
    try {
        const id = req.params['id'];
        await getController().delete(id);
        return res.status(204).end();
    } //
    catch (e) {
        console.error(e);
        return res.status(500)
            .json({
                message: 'Ocorreu um erro inexperado! Tente mais tarde'
            });
    }
}
