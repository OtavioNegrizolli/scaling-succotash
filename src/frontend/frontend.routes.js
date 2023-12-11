import express, { Router } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendRoutes = Router();
console.log(path.join(__dirname, 'assets'));
// frontendRoutes.get('/assets/.+', (req, res) => {
//     console.log(req.url);
// });

// frontendRoutes.get('^/$|index(\.html)?')
frontendRoutes.get('^/login(\.html)?', (_, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

frontendRoutes.use('/assets', express.static(path.join(__dirname, 'assets')));

export default frontendRoutes;
