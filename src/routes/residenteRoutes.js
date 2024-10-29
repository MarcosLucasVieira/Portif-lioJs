import express from "express";
import ResidentesController from "../controllers/residentesController.js"

const routes = express.Router();

routes.get("/residentes",ResidentesController.listarResidentes);
routes.get("/residentes/:id",ResidentesController.listarResidentesPorId);
routes.post("/residentes",ResidentesController.cadastrarResidente);


export default routes;