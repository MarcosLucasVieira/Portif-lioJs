import NaoEncontrado from "../erros/naoEncontrado.js";
import residentes from "../models/Residentes.js";

class ResidentesController {

    static async cadastrarResidente(req, res, next){
        try{
            const novoResidente = await residentes.create(req.body);
            res.status(201).json({message:"Cadastro de residente criado com sucesso", redisentes: novoResidente });
        }catch(erro){
            next(erro);
        }
    }

    static async listarResidentes(req, res, next){
        try{
            const listaResidentes = await residentes.findById({});
            res.status(200).json(listaResidentes);   

        }catch(erro){
            next(erro);
        }
    }

    static async listarResidentesPorId(req, res, next){
        try {
        const id = req.params.id;
        const residenteEncontrado = await residentes.findById(id);

        if(residenteEncontrado){
            res.status(200).send(residenteEncontrado);
        } else {
            next(new NaoEncontrado("ID DO RESIDENTE NÃO LOCALIZADO"));
        }
    } catch (erro){
        next(erro);
    }
    };




}

export default ResidentesController;