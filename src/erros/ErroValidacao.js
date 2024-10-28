import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta{
    constructor(erro){
        
        const mesagenErro = Object.values(erro.errors)
        .map(erro => erro.message)
        .join("; ");

        
        super(`Os Seguintes erros foram encontrados: ${mesagenErro}`);
    }
}

export default ErroValidacao;