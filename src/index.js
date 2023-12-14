import express from "express";
import backendRoutes from "./backend/backend.routes.js";
import frontendRoutes from "./frontend/frontend.routes.js";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.POST || 4000;
const HOST = process.env.HOST || '127.0.0.1';

const app = express();
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('common'));
// a ordem importa
app.use('/api', backendRoutes);
app.use(frontendRoutes);

app.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}`);
});
