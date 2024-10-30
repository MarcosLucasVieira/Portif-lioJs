import express from "express";
import ResidentesController from "../controllers/residentesController.js"

const routes = express.Router();

routes.get("/residentes",ResidentesController.listarResidentes);
routes.get("/residentes/busca",ResidentesController.listarResidentesPorMatricula);
routes.get("/residentes/:id",ResidentesController.listarResidentesPorId);
routes.post("/residentes",ResidentesController.cadastrarResidente);
routes.put("/residentes/:id",ResidentesController.atualizarResidentes);
routes.put("/residentes/:id",ResidentesController.deletarResidentes);



export default routes;