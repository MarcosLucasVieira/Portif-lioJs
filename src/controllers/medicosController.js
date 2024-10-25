import medicos from "../models/Medicos.js";

class MedicoController{

       static async listarMedicos(req,res){
              const listaMedicos = await medicos.find({});
              res.status(200).json(listaMedicos);
       }


       static async listarMedicoPorId(req,res){
              try{
                     const id = req.params.id;
                     const medicoEncontrado = await medicos.findById({id});
                             res.status(200).json(medicoEncontrado);
              } catch(erro){
                     res.status(500).json({message:`${erro.message} - FALHA AO PROCURAR MEDICO`})
              }
       }
       
       static async cadastrarMedicos(req,res){
              try{
                     const novoMedico = await medicos.create(req.body);
                     res.status(201).json({ message: "criado com sucesso", medicos:
                       novoMedico })
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
