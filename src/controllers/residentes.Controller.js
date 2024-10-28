class ResidentesController {

    static async cadastrarResidente(req, res, next){
        try{
            const novoResidente = await ResidentesController.cadastrarResidente(req.body);
            res.status(201)({message:"Cadastro de residente criado com sucesso", redisentes: novoResidente});
        }catch(erro){
            next(erro);
        }
    }


}

export default ResidentesController;