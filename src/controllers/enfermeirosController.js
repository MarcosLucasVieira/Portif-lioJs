import mongoose from "mongoose";
import enfermeiros from "../models/Enfermeiros.js";

class EnfermeirosController{

    static async listarEnfermeiros(req, res){
        try{
            const listaEnfermeiros = await enfermeiros.find();
                res.status(200).json(listaEnfermeiros);
        }catch(erro){
            res.status(500).json({message:`${erro.message} - FALHA NA REQUISIÇÃO`})

        }
        
    }
  
    static async listadeEnfermeirosPorId(req, res) {
        try {
            const id = req.params.id;
            const enfermeiroEncontrado = await enfermeiros.findById(id); // Certifique-se de passar o id diretamente
    
            if (enfermeiroEncontrado) { // Verifique se o paciente foi encontrado
                res.status(200).send(enfermeiroEncontrado); // Corrigido para enviar o paciente encontrado
            } else {
                res.status(404).json({ message: "ID DO ENFERMEIRO(A) NÃO LOCALIZADO" });
            }
        } catch (erro) {
            if (erro instanceof mongoose.Error.CastError) {
                res.status(400).send({ message: "Um ou mais dados fornecidos estão incorretos." });
            } else {
                res.status(500).send({ message: "Erro interno de servidor." });
            }
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