import express, { Router } from "express";


const backendRoutes = Router();
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
function handleLogin(req, res) {
    const data = req.body;
    console.log(data);
    if (data['name'] == 'asdf')
        return res.json({ token: 'fuckof' });

    return res.status(401).json({ error: 'Dont know, dont care' });
}

backendRoutes.post('/login', handleLogin);


export default backendRoutes;
