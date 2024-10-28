import mongoose from "mongoose";
import { pacientes } from "../models/Pacientes.js"

class PacientesController{

       static async listarPacientes(req,res){
              const listaPacientes = await pacientes.find({});
              res.status(200).json(listaPacientes);
       }

       static async listaPacientePorId(req, res) {
              try {
                  const id = req.params.id;
                  const pacienteEncontrado = await pacientes.findById(id); // Certifique-se de passar o id diretamente
          
                  if (pacienteEncontrado) { // Verifique se o paciente foi encontrado
                      res.status(200).send(pacienteEncontrado); // Corrigido para enviar o paciente encontrado
                  } else {
                      res.status(404).json({ message: "ID DO PACIENTE NÃO LOCALIZADO" });
                  }
              } catch (erro) {
                  if (erro instanceof mongoose.Error.CastError) {
                      res.status(400).send({ message: "Um ou mais dados fornecidos estão incorretos." });
                  } else {
                      res.status(500).send({ message: "Erro interno de servidor." });
                  }
              }
          }
          
       
       static async cadastrarPacientes(req,res){
              try{
                     const novoPaciente = await pacientes.create(req.body);
                     res.status(201).json({ message: "criado com sucesso", pacientes:
                       novoPaciente })
              }catch(erro){
                      res.status(500).json({message: `${erro.message}- FALHA AO CADASTRAR PACIENTE`})
              }   
       }

       
       static async atualizaPaciente(req,res){
              try{
                      const id = req.params.id;
                      await pacientes.findByIdAndUpdate(id, req.body);
                            res.status(200).json({message: "Cadastro Atualizado"})
              } catch(erro){
                     res.status(500).json({message:`${erro.message} - FALHA AO ATUALIZAR`})

              }
       }

       static async deletarPaciente(req, res){
              try{
                     const id = req.params.id;
                     await pacientes.findByIdAndDelete(id);
                            res.status(200).json({message: " Cadastro Deletado"})

              }catch(erro){
                     res.status(500).json({message:`${erro.message} - FALHA AO DELETAR`}) 
              }
       }
};

export default PacientesController;
