import express from "express";
import MedicoController from "../controllers/medicosController.js";

const routes = express.Router();

routes.get("/medicos", MedicoController.listarMedicos);
routes.get("/medicos/:id", MedicoController.listarMedicoPorId);
routes.post("/medicos", MedicoController.cadastrarMedicos);
routes.get("/medicos/:id", MedicoController.atualizarMedico);
routes.delete("/medicos/:id", MedicoController.deletarMedico);

export default routes;