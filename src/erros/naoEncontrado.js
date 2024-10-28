import Errobase from "./erroBase.js";

class NaoEncontrado extends Errobase{

    constructor(mensagem = "Página não encontrada", status= 404){
        super(mensagem, status);
    }

}

export default NaoEncontrado;