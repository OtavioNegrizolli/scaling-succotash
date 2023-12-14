import express, { Router } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendRoutes = Router();


frontendRoutes.get('^/login(\.html)?', (_, res) => {
    return res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

frontendRoutes.get('^/$|/index(\.html)?', (_, res) => {
    return res.sendFile(path.join(__dirname, 'restricted', 'index.html'));
});
frontendRoutes.get('^/motoristas/:id', (_, res) => {
    return res.sendFile(path.join(__dirname, 'restricted', 'driver.html'));
});

frontendRoutes.get('^/veiculos', (_, res) => {
    return res.sendFile(path.join(__dirname, 'restricted', 'vehicle-list.html'));
});
frontendRoutes.get('^/veiculos/:id', (_, res) => {
    return res.sendFile(path.join(__dirname, 'restricted', 'vehicle.html'));
});

frontendRoutes.use('/assets', express.static(path.join(__dirname, 'assets')));

frontendRoutes.get('*', (req,res) => {
    res.status(404);
    return res.sendFile(path.join(__dirname, 'public', '404.html'))
});
export default frontendRoutes;
