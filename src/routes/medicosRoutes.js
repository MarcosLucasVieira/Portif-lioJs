import express from "express";
import MedicoController from "../controllers/medicosController.js";
import paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes.get("/medicos", MedicoController.listarMedicos, paginar);
routes.get("/medicos/busca", MedicoController.listarMedicosPorFiltro);
routes.get("/medicos/:id", MedicoController.listarMedicoPorId);
routes.post("/medicos", MedicoController.cadastrarMedicos);
routes.put("/medicos/:id", MedicoController.atualizarMedico);
routes.delete("/medicos/:id", MedicoController.deletarMedico);

export default routes;