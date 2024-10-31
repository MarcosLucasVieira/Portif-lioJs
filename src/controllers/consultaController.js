import consultas from "../models/Consulta.js"
import { pacientes } from "../models/Pacientes.js";
import { medicos } from "../models/Medicos.js";
import NaoEncontrado from "../erros/naoEncontrado.js"
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js"

class consultaController {

    
    static async listarConsultas(req, res, next){
        try{
            let {limite = 5, pagina = 1} = req.query;

            limite = parseInt(limite);
            pagina = parseInt(pagina);
       
        if(limite > 0 && pagina >0){
        const listaConsultas = await consultas.find()
        .skip((pagina - 1)* limite)
        .limit(limite)
        
        res.status(200).json({listaConsultas});
        } else{
            next(new RequisicaoIncorreta);
        }
    }catch(erro){
        next(erro);
    }};

    static async criarConsulta (req, res, next) {
        const novaConsulta = req.body;
        
        try{
            const pacienteEncontrado = await pacientes.findById(novaConsulta.pacientes);
            if(!pacienteEncontrado){
                return res.status(404).json({message: "Paciente não encontrado"});
            }

            const medicoEncontrado = await medicos.findById(novaConsulta.medicos);
            if(!medicoEncontrado){
                return res.status(404).json({message:"Medico não encontrado"});
            }

            const pacienteNome = pacienteEncontrado.nome;
            const pacienteId = pacienteEncontrado.id;

            const medicoNome = medicoEncontrado.nome;
            const medicoId = medicoEncontrado.id;
            const medicoEspecialidade = medicoEncontrado.especialidade;

            const consultaPacienteMedico = {
                ...novaConsulta,
                pacientes: pacienteId,
                pacientes: pacienteNome,
                medicos: medicoNome,
                medicos: medicoId,
                medicos: medicoEspecialidade
            };

            const consultaCriada = await consultas.create(consultaPacienteMedico);

            res.status(201).json({
                message:"Criado com sucesso",
                consultas: consultaCriada,
                medicos:{
                    id: medicoId,
                    nome: medicoNome,
                    especialidade: medicoEspecialidade
                },
                pacientes:{
                    id: pacienteId,
                    nome: pacienteNome
                }
            });       
    }catch(erro){
        next(erro);
    }
    }
};

export default consultaController;