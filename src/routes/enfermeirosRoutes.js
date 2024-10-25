import express from "express";
import EnfermeirosController from "../controllers/enfermeirosController.js";

const routes = express.Router();

routes.get("/enfermeiros", EnfermeirosController.listarEnfermeiros);
routes.get("/enfermeiros/:id", EnfermeirosController.listarEnfermeirosPorId);
routes.post("/enfermeiros", EnfermeirosController.cadastrarEnfermeiros);
routes.put("/enfermeiros/:id", EnfermeirosController.atualizaEnfermeiros);
routes.delete("/enfermeiros/:id", EnfermeirosController.deletarEnfermeiro)

export default routes;