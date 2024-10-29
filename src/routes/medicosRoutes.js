import express from "express";
import MedicoController from "../controllers/medicosController.js";

const routes = express.Router();

routes.get("/medicos", MedicoController.listarMedicos);
routes.get("/medicos/:id", MedicoController.listarMedicoPorId);
routes.get("medicos/busca", MedicoController.listarMedicosPorNome);
routes.post("/medicos", MedicoController.cadastrarMedicos);
routes.post("/medico/:id", MedicoController.atualizarMedico);
routes.delete("/medicos/:id", MedicoController.deletarMedico);

export default routes;