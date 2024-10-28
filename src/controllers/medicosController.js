import mongoose from "mongoose";
import medicos from "../models/Medicos.js";
import { pacientes } from "../models/Pacientes.js";

class MedicoController{

       static async listarMedicos(req,res){
              const listaMedicos = await medicos.find({});
              res.status(200).json(listaMedicos);
       }

       static async listarMedicoPorId(req,res){
              try{
                     const id = req.params.id;
                     const medicoEncontrado = await medicos.findById(id);

                     if(medicoEncontrado !== null ){
                            res.status(200).send(medicoEncontrado);
                     }else{
                             res.status(404).json({message: "ID DO MEDICO NÃO LOCALIZADO"})
                     }
              } catch(erro){

                     if (erro instanceof mongoose.Error.CastError){
                            res.status(400).send({message:"um ou mais dados fornecidos estão incorretos."});
                     } else{
                            res.status(500).send({message:"Erro interno de servidor."})
                     }
              
              }
       }
       
       static async cadastrarMedicos(req,res){
              const novoMedico = req.body;
              try{
                     const pacienteEncontrado = await pacientes.findById(novoMedico.pacientes);
                     let pacienteId = pacienteEncontrado._id;
                     const medicoPaciente ={ ... novoMedico, paciente: pacienteId};
                     const consultaCriada = await medicos.create(medicoPaciente);
                     res.status(201).json({ message: "criado com sucesso", medicos:consultaCriada })
              }catch(erro){
                      res.status(500).json({message: `${erro.message}- FALHA AO CADASTRAR MEDICO`})
              }   
       }
       
       static async atualizarMedico(req,res){
              try{
                      const id = req.params.id;
                      await medicos.findByIdAndUpdate(id, req.body);
                            res.status(200).json({message: "Cadastro Atualizado"})
              } catch(erro){
                     res.status(500).json({message:`${erro.message} - FALHA AO ATUALIZAR`})

              }
       }

       static async deletarMedico(req, res){
              try{
                     const id = req.params.id;
                     await medicos.findByIdAndDelete(id);
                            res.status(200).json({message: " Cadastro Deletado"})

              }catch(erro){
                     res.status(500).json({message:`${erro.message} - FALHA AO DELETAR`}) 
              }
       }
};

export default MedicoController;
