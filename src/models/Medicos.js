import mongoose from "mongoose";
import { pacienteSchema } from "./Pacientes.js";


const MedicosSchema = new mongoose.Schema({
    id:{
        type: mongoose.Types.ObjectId},
    nome:{
              type: String,
              required: [true," O NOME DO MÉDICO(A) É OBRIGATÓRIO"]},
              
    crm:{
             type:String,
             required:[true,"O CRM É OBRIGATÓRIO"], 
             match:[ /^[0-9]{5,6}$/, "O crm deve ter de 5 a 6 dígitos"]},
             
             
    especialidade: { 
            type: String,
            required: [true, "A ESPECIALIDADE DO MÉDICO(A) É OBRIGATÓRIA"], 
             enum: {               
                values:['ORTOPEDIA', 'PEDIATRIA', 'CARDIOLOGIA'],
                message:"A especialidade {VALUE} não permitida"},
    },
    idade:{
        type: Number,
        min: [18, "A idade minima dever ser 18 anos"], // Especificando o mínimo de forma correta
        required: true
    },

    pacientes: {pacienteSchema}
}, {versionKey:false});

const medicos = mongoose.model("medicos", MedicosSchema);


export default medicos;