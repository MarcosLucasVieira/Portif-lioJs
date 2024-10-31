import express from "express";
import ResidentesController from "../controllers/residentesController.js"
import paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes.get("/residentes",ResidentesController.listarResidentes,paginar);
routes.get("/residentes/busca",ResidentesController.listarResidentesPorFiltro);
routes.get("/residentes/:id",ResidentesController.listarResidentesPorId);
routes.post("/residentes",ResidentesController.cadastrarResidente);
routes.put("/residentes/:id",ResidentesController.atualizarResidentes);
routes.put("/residentes/:id",ResidentesController.deletarResidentes);



export default routes;