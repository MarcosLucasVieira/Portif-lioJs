import  express from "express";
import medicos from "./medicosRoutes.js";
import enfermeiros from "./enfermeirosRoutes.js";
import pacientes from "./pacientesRoutes.js"

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("Curso de Node.js"));
    app.use(express.json(), enfermeiros);
    app.use(express.json(), medicos);
    app.use(express.json(), pacientes)
};

export default routes;