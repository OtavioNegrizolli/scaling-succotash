import express, { Router } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendRoutes = Router();

// login
frontendRoutes.get('^/login(\.html)?', (_, res) => {
    return res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
// home
frontendRoutes.get('^/$|/index(\.html)?', (_, res) => {
    return res.sendFile(path.join(__dirname, 'restricted', 'index.html'));
});

// drivers
frontendRoutes.get('^/motoristas/:id', (_, res) => {
    return res.sendFile(path.join(__dirname, 'restricted', 'driver', 'driver.html'));
}).get('^/motoristas', (_, res) => {
    return res.sendFile(path.join(__dirname, 'restricted', 'driver', 'index.html'));
});

// vehicles
frontendRoutes.get('^/veiculos', (_, res) => {
    return res.sendFile(path.join(__dirname, 'restricted', 'vehicle', 'index.html'));
}).get('^/veiculos/:id', (_, res) => {
    return res.sendFile(path.join(__dirname, 'restricted', 'vehicle', 'vehicle.html'));
});

// path
frontendRoutes.get('^/trajetos', (_, res) => {
    return res.sendFile(path.join(__dirname, 'restricted', 'path', 'index.html'));
}).get('^/trajetos/:id', (_, res) => {
    return res.sendFile(path.join(__dirname, 'restricted', 'path', 'path.html'));
});

// assets
frontendRoutes.use('/assets', express.static(path.join(__dirname, 'assets')));

// fallback
frontendRoutes.get('*', (req, res) => {
    res.status(404);
    return res.sendFile(path.join(__dirname, 'public', '404.html'))
});
export default frontendRoutes;
