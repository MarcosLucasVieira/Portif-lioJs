import NaoEncontrado from "../erros/naoEncontrado.js";
import {residentes} from "../models/index.js";

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
            const listaResidentes = await residentes.find({});
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

    static async atualizarResidentes(req, res, next){
        try{
            const id = req.params.id;
            const residenteEncontrado = await residentes.findByIdAndUpdate(id, req.body);
            
            if(residenteEncontrado){
                res.status(200).json({message: "Cadastro Atualizado"});
            } else {
                next(new NaoEncontrado("ID DO RESIDENTE NÃO LOCALIZADO"))
            }
        } catch(erro){
            next(erro);
        }
    };

    static async deletarResidentes(req, res, next){
        try{
            const id = req.params.id;
            const redisentesEncontrado = await residentes.findByIdAndDelete(id);

            if(redisentesEncontrado){
                res.status(204).json({message:"Cadastro deletado"})
            } else{
                next(new NaoEncontrado("ID DO RESIDENTE NÃO LOCALIZADO"))
            }
        } catch(erro){
            next(erro);
        }
    };

    static async listarResidentesPorMatricula (req, res, next){
        const matricula = req.query.matricula;
        try{
            const residentesPorMatricula = await residentes.find({matricula:matricula})
            res.status(200).json(residentesPorMatricula)
        } catch(erro){
            next(erro);
        }
    }





}

export default ResidentesController;