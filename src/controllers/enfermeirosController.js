import NaoEncontrado from "../erros/naoEncontrado.js";
import {enfermeiros} from "../models/index.js";

class EnfermeirosController{

    static async listarEnfermeiros(req, res,next){
        try{
            const listaEnfermeiros = await enfermeiros.find();
                res.status(200).json(listaEnfermeiros);
        }catch(erro){
            next(erro);
        }
        
    };
  
    static async listadeEnfermeirosPorId(req, res, next) {
        try {
            const id = req.params.id;
            const enfermeiroEncontrado = await enfermeiros.findById(id); // Certifique-se de passar o id diretamente
    
            if (enfermeiroEncontrado) { // Verifique se o paciente foi encontrado
                res.status(200).send(enfermeiroEncontrado); // Corrigido para enviar o paciente encontrado
            } else {
                next(new NaoEncontrado("ID DO ENFERMEIRO(A) NÃO LOCALIZADO."))
            }
        } catch (erro) {
           next (erro);
        }
    };
    
    
    static async cadastrarEnfermeiros(req,res, next){
        try{
            const novoEnfermeiro = await enfermeiros.create(req.body);
            res.status(201).json({ message: "criado com sucesso", enfermeiros:  novoEnfermeiro })
        }catch(erro){
           next(erro);
        }
    };

    static async atualizaEnfermeiros(req, res, next){
        try{
            const id = req.params.id;
            const enfermeiroEncontrado = await enfermeiros.findByIdAndUpdate(id, req.body);

            if (enfermeiroEncontrado){
                res.status(200).json({message: "Cadastro Atualizado"})
            }else{
                next(new NaoEncontrado("ID DO ENFERMEIRO(A) NÃO LOCALIZADO."));
            }
        }catch(erro){
           next(erro)
        }
    };

    static async deletarEnfermeiro(req, res, next){
        try{
               const id = req.params.id;
               const enfermeiroEncontrado = await enfermeiros.findByIdAndDelete(id);

                if (enfermeiroEncontrado){
                    res.status(204).json({ message: " Cadastro Deletado"});
                } else {
                    next(new NaoEncontrado("ID DO ENFERMEIRO(A) NÃO LOCALIZADO."));
                }

        }catch(erro){
            next(erro);
        }
    };

    static async listarEnfermeirosPorCoren(req, res, next){
        const coren = req.query.coren;
        try{
            const enfermeirosPorCoren = await enfermeiros.find({coren:coren});
            res.status(200).json(enfermeirosPorCoren);
        } catch(erro){
            next(erro);
        }
    };
    
};

export default EnfermeirosController;