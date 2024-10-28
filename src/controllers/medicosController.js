import mongoose from "mongoose";
import medicos from "../models/Medicos.js";
import { pacientes } from "../models/Pacientes.js";
import NaoEncontrado from "../erros/naoEncontrado.js";

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
                            next(new NaoEncontrado ("ID DO MEDICO(A) NÃO LOCALIZADO"));
                     }
              } catch(erro){
                     next(erro);
              
              }
       }
       
       static async cadastrarMedicos(req,res,next){
              const novoMedico = req.body;
              try{
                     const pacienteEncontrado = await pacientes.findById(novoMedico.pacientes);
                     let pacienteNome= pacienteEncontrado.nome;
                     let pacienteId = pacienteEncontrado._id;
                     const medicoPaciente ={ ... novoMedico, paciente: pacienteId, pacienteNome};
                     const consultaCriada = await medicos.create(medicoPaciente);
                       res.status(201).json({
            message: "criado com sucesso",
            medicos: consultaCriada,
            paciente: {
                id: pacienteId,
                nome: pacienteNome
            }
        });
              }catch(erro){
                     next(erro);
              }   
       }
       
       static async atualizarMedico(req,res,next){
              try{
                      const id = req.params.id;
                      const medicoEncontrado = await medicos.findByIdAndUpdate(id, req.body);
                     
                      if(medicoEncontrado){
                            res.status(200).json({message: "CADASTRO ATUALIZADO"})
                      } else {
                            next(new NaoEncontrado("ID DO MÉDICO(A) NÃO ENCONTRADO"))
                      }                                    

              } catch(erro){
                     next(erro);
              }
       }

       static async deletarMedico(req, res){
              try{
                     const id = req.params.id;
                     const medicoEncontrado =await medicos.findByIdAndDelete(id);
                          
                     if(medicoEncontrado){
                            res.status(200).json({message: " Cadastro Deletado"})
                     } else {
                            next(new NaoEncontrado("ID DO MÉDICO(A) NÃO ENCONTRADO"))
                     }

              }catch(erro){
                     next(erro);
              }
       }
};

export default MedicoController;
