import enfermeiros from "../models/Enfermeiros.js";

class EnfermeirosController{

    static async listarEnfermeiros(req, res){
        try{
            const listaEnfermeiros = await enfermeiros.find({});
                res.status(200).json(listaEnfermeiros);
        }catch(erro){
            res.status(500).json({message:`${erro.message} - FALHA NA REQUISIÇÃO`})

        }
        
    }

    static async listarEnfermeirosPorId(req, res){
        try{
            const id = req.params.id;
            const enfermeiroEncontrado = await enfermeiros.findById({id});
                res.status(200).json(enfermeiroEncontrado);
        }catch(erro){
            res.status(500).json({message:`${erro.message} - FALHA NA REQUISIÇÃO`})

        }
        
    }
    
    static async cadastrarEnfermeiros(req,res){
        try{
            const novoEnfermeiro = await enfermeiros.create(req.body);
            res.status(201).json({ message: "criado com sucesso", enfermeiros:  novoEnfermeiro })
        }catch(erro){
            res.status(500).json({message: `${erro.message}- FALHA AO CADASTRAR ENFERMEIRO`})
        }
    }

    static async atualizaEnfermeiros(req, res){
        try{
            const id = req.params.id;
            await enfermeiros.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "Cadastro Atualizado"})
        }catch(erro){
            res.status(500).json({message:`${erro.message} - FALHA NA ATUALIZAÇÃO`})

        }
        
    }
    static async deletarEnfermeiro(req, res){
        try{
               const id = req.params.id;
               await enfermeiros.findByIdAndDelete(id);
                      res.status(200).json({ message: " Cadastro Deletado"})

        }catch(erro){
               res.status(500).json({message:`${erro.message} - FALHA AO DELETAR`}) 
        }
 }
    
};

export default EnfermeirosController;