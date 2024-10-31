import express from "express";
import consultarController from "../controllers/consultaController.js";

const routes = express.Router();
routes.get("/consultas", consultarController.listarConsultas);
routes.post("/consultas", consultarController.criarConsulta);

export default routes;