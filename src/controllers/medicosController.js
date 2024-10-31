import {medicos} from "../models/index.js";
import {  pacientes } from "../models/Pacientes.js";
import NaoEncontrado from "../erros/naoEncontrado.js";

class MedicoController{

       static async listarMedicos(req,res, next){
              try{
                     const buscaMedicos = medicos.find();

                     req.resultado = buscaMedicos;
                     next();
       } catch(erro){
           next(erro);
       }};

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
       };
       
       static async cadastrarMedicos(req, res, next) {
              const novoMedico = req.body;
              try {
                  const pacienteEncontrado = await pacientes.findById(novoMedico.pacientes);
                  
                  if (!pacienteEncontrado) {
                      return res.status(404).json({ message: "Paciente não encontrado!" });
                  }
          
                  const pacienteNome = pacienteEncontrado.nome;
                  const pacienteId = pacienteEncontrado._id;
          
                  const medicoPaciente = { ...novoMedico, pacientes: pacienteId, pacientes: pacienteNome };
                  const consultaCriada = await medicos.create(medicoPaciente);
          
                  res.status(201).json({
                      message: "Criado com sucesso",
                      medicos: consultaCriada,
                      paciente: {
                          id: pacienteId,
                          nome: pacienteNome
                      }
                  });
              } catch (erro) {
                  next(erro);
              }
          };
          
       
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
       };

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
       };

     static async listarMedicosPorFiltro (req, res, next){
       try{
              const busca = await processaBusca(req.query);

              const medicosResultado = await medicos
              .find(busca)
              .populate("pacientes"); 

              
              res.status(200).send(medicosResultado);
       }catch(erro){
              next(erro);
       }
     };    
};

async function processaBusca(parametros) {
       const {especialidade, nome} = parametros;
 

       const busca = {};
       if(especialidade)busca.especialidade = {$regex:especialidade, $options:"i"};
       if(nome)busca.nome = {$regex: nome, $options: "i"};
       
       
       return busca;
};
    

export default MedicoController;