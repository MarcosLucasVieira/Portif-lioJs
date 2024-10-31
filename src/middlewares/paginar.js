import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

async function paginar(req, res, next){
    try{

        let{ limite = 5, pagina = 1, ord ="_id:-1"} = req.query;
    
        let[campoOrd, ordem] = ord.split(":");
    
        limite = parseInt(limite);
        pagina = parseInt(pagina);
        ord = parseInt(ord);

        const resultado= req.resultado;
    
        if(limite > 0 && pagina > 0){
               const resultadoPaginado =  await resultado.find()
               .sort({[campoOrd]: ordem})
               .skip((pagina - 1)*limite)
               .limit(limite)          
    
               res.status(200).json(resultadoPaginado);
        }else{
           next(new RequisicaoIncorreta);
        }
    } catch(erro){
        next(erro);
    }
}

export default paginar;