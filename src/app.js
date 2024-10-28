import express, { json } from "express";
import conectar from "./config/dbConnect.js";
import routes from "./routes/index.js";

const conexao = await conectar();

conexao.on("error", (erro) => {
    console.error("erro de conexão", erro);
});

conexao.once("open", ()=> {
    console.log("Conexão feita com sucesso")
})

const app = express();
routes(app);

app.use((erro, req, res, next) => {
    res.status(500).send({message:"Erro interno do servidor"});
})



export default app;