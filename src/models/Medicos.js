import mongoose from "mongoose";
import { pacienteSchema } from "./Pacientes.js";


const MedicosSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    nome:{type: String, required: true},
    crm:{type:Number, required:true},
    idade:{type:Number},
    pacientes: pacienteSchema
}, {versionKey:false});

const medicos = mongoose.model("medicos", MedicosSchema);

export default medicos;