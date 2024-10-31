import  express from "express";
import medicos from "./medicosRoutes.js";
import enfermeiros from "./enfermeirosRoutes.js";
import pacientes from "./pacientesRoutes.js"
import residentes from "./residenteRoutes.js";
import consultas from "./consultasRoutes.js";
import manipulador404 from "../middlewares/manipulador404.js";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("Curso de Node.js"));
    app.use(express.json(), medicos, pacientes, enfermeiros, residentes, consultas);
    app.use(manipulador404);
};

export default routes;