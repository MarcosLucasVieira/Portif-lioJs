import mongoose from "mongoose";
import Errobase from "../erros/erroBase.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";

function manipuladorDeErros(erro, req, res, next){
    if(erro instanceof mongoose.Error.CastError){
      new RequisicaoIncorreta().enviarResposta(res);
    } else if(erro instanceof mongoose.Error.ValidationError){
        new ErroValidacao(erro).enviarResposta(res);
    }else if(erro instanceof Errobase){
        erro.enviarResposta(res);    
    } else{
        new Errobase().enviarResposta(res); 
    }
}

export default manipuladorDeErros