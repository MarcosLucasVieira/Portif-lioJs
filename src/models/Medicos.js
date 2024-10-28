import mongoose from "mongoose";
import { pacienteSchema } from "./Pacientes.js";

const especialidades = ['ORTOPEDIA', 'PEDIATRIA', 'CARDIOLOGIA']

const MedicosSchema = new mongoose.Schema({
    id:{type: mongoose.Types.ObjectId},
    nome:{type: String, required: true},
    crm:{type:String, required:true, match: /^[0-9]{6,8}$/},
    especialidade: { type: String, enum: especialidades, required: true}, 
    idade:{type:Number},

    pacientes: {pacienteSchema}
}, {versionKey:false});

const medicos = mongoose.model("medicos", MedicosSchema);


export default medicos;