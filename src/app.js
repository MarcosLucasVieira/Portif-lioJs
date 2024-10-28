import express, { json } from "express";
import conectar from "./config/dbConnect.js";
import routes from "./routes/index.js";
import mongoose, { mongo } from "mongoose";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";

const conexao = await conectar();

conexao.on("error", (erro) => {
    console.error("erro de conexão", erro);
});

conexao.once("open", ()=> {
    console.log("Conexão feita com sucesso")
})

const app = express();
routes(app);

app.use(manipuladorDeErros);



export default app;