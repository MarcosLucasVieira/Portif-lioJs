import ErroBase from "./erroBase.js"

class RequisicaoIncorreta extends ErroBase{
    
    constructor(mensagem = "um ou mais dados fornecidos estão incorretos"){
        super(mensagem, 400)
    }
}

export default RequisicaoIncorreta;