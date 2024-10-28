import mongoose from "mongoose";
import medicos from "../models/Medicos.js";
import { pacientes } from "../models/Pacientes.js";

class MedicoController{

       static async listarMedicos(req,res){
              const listaMedicos = await medicos.find({});
              res.status(200).json(listaMedicos);
       }

       static async listarMedicoPorId(req,res, next){
              try{
                     const id = req.params.id;
                     const medicoEncontrado = await medicos.findById(id);

                     if(medicoEncontrado !== null ){
                            res.status(200).send(medicoEncontrado);
                     }else{
                             res.status(404).json({message: "ID DO MEDICO(A) NÃO LOCALIZADO"})
                     }
              } catch(erro){
                     next(erro);
              
              }
       }
       
       static async cadastrarMedicos(req,res,next){
              const novoMedico = req.body;
              try{
                     const pacienteEncontrado = await pacientes.findById(novoMedico.pacientes);
                     let pacienteId = pacienteEncontrado._id;
                     const medicoPaciente ={ ... novoMedico, paciente: pacienteId};
                     const consultaCriada = await medicos.create(medicoPaciente);
                     res.status(201).json({ message: "criado com sucesso", medicos:consultaCriada })
              }catch(erro){
                     next(erro);
              }   
       }
       
       static async atualizarMedico(req,res,next){
              try{
                      const id = req.params.id;
                      await medicos.findByIdAndUpdate(id, req.body);
                            res.status(200).json({message: "Cadastro Atualizado"})
              } catch(erro){
                     next(erro);
              }
       }

       static async deletarMedico(req, res){
              try{
                     const id = req.params.id;
                     await medicos.findByIdAndDelete(id);
                            res.status(200).json({message: " Cadastro Deletado"})

              }catch(erro){
                     next(erro);
              }
       }
};

export default MedicoController;
