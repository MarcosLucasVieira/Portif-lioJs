import express from "express";
import EnfermeirosController from "../controllers/enfermeirosController.js";
import paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes.get("/enfermeiros", EnfermeirosController.listarEnfermeiros,paginar);
routes.get("/enfermeiros/busca",EnfermeirosController.listarEnfermeirosPorFiltro);
routes.get("/enfermeiros/:id", EnfermeirosController.listadeEnfermeirosPorId);
routes.post("/enfermeiros", EnfermeirosController.cadastrarEnfermeiros);
routes.put("/enfermeiros/:id", EnfermeirosController.atualizaEnfermeiros);
routes.delete("/enfermeiros/:id", EnfermeirosController.deletarEnfermeiro)

export default routes;