import NaoEncontrado from "../erros/naoEncontrado.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import {enfermeiros} from "../models/index.js";

class EnfermeirosController{

    static async listarEnfermeiros(req, res,next){
        try{
            let{limite = 5, pagina =1} = req.query;

            limite = parseInt(limite);
            pagina = parseInte(pagina);

            if(limite > 0 && pagina >0){
                const listaEnfermeiros = await enfermeiros.find()
                .skip((pagina -1)* limite)
                .limit(limite)
                
                res.status(200).json(listaEnfermeiros);
            }else {
                next(new RequisicaoIncorreta)
            }
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

    static async listarEnfermeirosPorFiltro(req, res, next){
        try{
            const {coren, nome} = req.query.coren;
            const busca = {};
            
            if(coren)busca.coren ={$regex:coren}
            if(nome)busca.nome ={$regex:nome, $options:"id"}

            const enfermeirosPorFiltro = await enfermeiros.find(busca);
            res.status(200).json(enfermeirosPorFiltro);
        } catch(erro){
            next(erro);
        }
    };
    
};

export default EnfermeirosController;