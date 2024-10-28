import enfermeiros from "../models/Enfermeiros.js";

class EnfermeirosController{

    static async listarEnfermeiros(req, res){
        try{
            const listaEnfermeiros = await enfermeiros.find();
                res.status(200).json(listaEnfermeiros);
        }catch(erro){
            next(erro);
        }
        
    }
  
    static async listadeEnfermeirosPorId(req, res, next) {
        try {
            const id = req.params.id;
            const enfermeiroEncontrado = await enfermeiros.findById(id); // Certifique-se de passar o id diretamente
    
            if (enfermeiroEncontrado) { // Verifique se o paciente foi encontrado
                res.status(200).send(enfermeiroEncontrado); // Corrigido para enviar o paciente encontrado
            } else {
                res.status(404).json({ message: "ID DO ENFERMEIRO(A) NÃO LOCALIZADO" });
            }
        } catch (erro) {
           next (erro);
        }
    }
    
    
    static async cadastrarEnfermeiros(req,res, next){
        try{
            const novoEnfermeiro = await enfermeiros.create(req.body);
            res.status(201).json({ message: "criado com sucesso", enfermeiros:  novoEnfermeiro })
        }catch(erro){
           next(erro);
        }
    }

    static async atualizaEnfermeiros(req, res, next){
        try{
            const id = req.params.id;
            await enfermeiros.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "Cadastro Atualizado"})
        }catch(erro){
           next(erro)
        }
    }

    static async deletarEnfermeiro(req, res, next){
        try{
               const id = req.params.id;
               await enfermeiros.findByIdAndDelete(id);
                      res.status(200).json({ message: " Cadastro Deletado"})
        }catch(erro){
            next(erro);
        }
 }
    
};

export default EnfermeirosController;