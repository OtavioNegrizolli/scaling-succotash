import express, { Router } from "express";
import {
    handleVehicleDelete,
    handleVehicleGet,
    handleVehicleIndex,
    handleVehiclePost,
    handleVehicleUpdate
} from './http/vehicle.handlers.js';

const backendRoutes = Router();

/** 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
function handleLogin(req, res) {
    const data = req.body;
    if (data['name'] == 'asdf')
        return res.json({ token: 'fuckof' });

    return res.status(403).json({ error: 'Dont know, dont care' });
}

backendRoutes.post('/login', handleLogin);

backendRoutes.route('/veiculos')
    .get(handleVehicleIndex)
    .post(handleVehiclePost);

backendRoutes.route('/veiculos/:id')
    .get(handleVehicleGet)
    .put(handleVehicleUpdate)
    .patch(handleVehicleUpdate)
    .delete(handleVehicleDelete);

// backendRoutes.route('/motoristas')
//     .get(handleVehicleIndex)
//     .post(handleVehiclePost);

// backendRoutes.route('/motoristas/:id')
//     .get(handleVehicleGet)
//     .put(handleVehicleUpdate)
//     .patch(handleVehicleUpdate);

export default backendRoutes;
