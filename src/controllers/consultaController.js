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
        .sort({_id:-1})
        .skip((pagina - 1)* limite)
        .limit(limite)
        
        res.status(200).json({listaConsultas});
        } else{
            next(new RequisicaoIncorreta);
        }
    }catch(erro){
        next(erro);
    }};

    static async criarConsulta(req, res, next) {
        const { dataConsulta, paciente, medico } = req.body;

        try {
            // Busca o paciente pelo ID
            const pacienteEncontrado = await pacientes.findById(paciente);
            if (!pacienteEncontrado) {
                return res.status(404).json({ message: "Paciente não encontrado" });
            }

            // Busca o médico pelo ID
            const medicoEncontrado = await medicos.findById(medico);
            if (!medicoEncontrado) {
                return res.status(404).json({ message: "Médico não encontrado" });
            }

            // Cria a consulta usando apenas os IDs de referência
            const consultaCriada = await consultas.create({
                dataConsulta,
                paciente: pacienteEncontrado._id,
                medico: medicoEncontrado._id,
            });

            res.status(201).json({
                message: "Consulta criada com sucesso",
                consulta: consultaCriada,
                medico: {
                    id: medicoEncontrado._id,
                    nome: medicoEncontrado.nome,
                    especialidade: medicoEncontrado.especialidade,
                },
                paciente: {
                    id: pacienteEncontrado._id,
                    nome: pacienteEncontrado.nome,
                }
            });
        } catch (erro) {
            next(erro);
        }
    };

    static async listaConsultasPorFiltro(req, res, next) {
        try {
            const busca = await procesaBusca(req.query);

            if( busca !== null){
                 const consultaResultado = await consultas
                .find(busca)
                .populate("medico")  // Certifique-se de que o campo corresponde ao seu modelo
                .populate("paciente"); // Popula também o paciente se precisar do nome dele

                res.status(200).send(consultaResultado);
            }else{
                res.status(200).send(["Nenhuma Consulta Encontrada com este nome "]);
            }
           
        } catch (erro) {
            next(erro);
        }
    };
};

async function procesaBusca(parametros) {
    const { nomeMedico, nomePaciente } = parametros;
    let busca = {};

    if (nomeMedico) {
        const medico = await medicos.findOne({ nome: nomeMedico }); // Adiciona await para resolver a promessa

        if (medico !== null) { // Verifica se o médico foi encontrado
            busca.medico = medico._id;
        } else{
            busca = null;
        }
    }

    if (nomePaciente) {
        const paciente = await pacientes.findOne({ nome: nomePaciente });

        if (paciente !== null ) { // Verifica se o paciente foi encontrado
            busca.paciente = paciente._id;
        }else{ busca= null}
    }

    return busca;
}

export default consultaController;