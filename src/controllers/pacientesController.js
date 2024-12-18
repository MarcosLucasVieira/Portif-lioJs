import { pacientes } from "../models/index.js"
import NaoEncontrado from "../erros/naoEncontrado.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

class PacientesController{

       static async listarPacientes(req,res, next){
              try{
                     const buscaPacientes = pacientes.find();

                     req.resultado = buscaPacientes;
                     next();
                     }catch(erro){
                            next(erro);
                     }
       };

       static async listaPacientePorId(req, res, next) {
              try {
                  const id = req.params.id;
                  const pacienteEncontrado = await pacientes.findById(id); // Certifique-se de passar o id diretamente
          
                  if (pacienteEncontrado) { // Verifique se o paciente foi encontrado
                      res.status(200).send(pacienteEncontrado); // Corrigido para enviar o paciente encontrado
                  } else {
                      next(new NaoEncontrado("ID DO PACIENTE NÃO LOCALIZADO"));
                  }
              } catch (erro) {
                 next(erro)
              }
          };
          
       static async cadastrarPacientes(req,res,next){
              try{
                     const novoPaciente = await pacientes.create(req.body);
                     res.status(201).json({ message: "criado com sucesso", pacientes:
                       novoPaciente })
              }catch(erro){
                     next(erro);
              }   
       };

       
       static async atualizaPaciente(req,res, next){
              try{
                      const id = req.params.id;
                      const pacienteEncontrado =  await pacientes.findByIdAndUpdate(id, req.body);
                      
                      if(pacienteEncontrado){
                            res.status(200).json({message: "Cadastro Atualizado"});
                      }else{
                            next(new NaoEncontrado("ID DO PACIENTE NÃO LOCALIZADO"));
                     }
              } catch(erro){
                     next(erro);
              }
       };

       static async deletarPaciente(req, res, next){
              try {
                     const id = req.params.id;
                     const pacienteEncontrado = await pacientes.findByIdAndDelete(id);
             
                     if (pacienteEncontrado) {
                         res.status(204).json({ message: "Cadastro Deletado" });
                     } else {
                       
                         next(new NaoEncontrado("ID DO PACIENTE NÃO LOCALIZADO!"));
                     }
                 } catch (erro) {
                     next(erro);
                 }
       };
       
       static async listarPacientesPorFiltro(req, res, next){
              try{
                    
                     const busca = await processaBusca(req.query);
                     const pacientesPorCpf = await pacientes.find(busca);
                     res.status(200).json(pacientesPorCpf);
              }catch(erro){
                     next(erro);
              }
       };

};

async function processaBusca(parametros) {
       const {cpf, nome} = parametros;

       const busca = {};
       if(cpf)busca.cpf ={$regex:cpf};
       if(nome)busca.nome ={$regex:nome, $options:"i"};
       return busca;
}


export default PacientesController;
