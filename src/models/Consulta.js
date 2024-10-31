import mongoose from "mongoose";
import { pacienteSchema } from "./Pacientes.js";
import {MedicosSchema} from "./Medicos.js";

const ConsultaSchema = new mongoose.Schema({
    id:{type: mongoose.Types.ObjectId},
    dataConsulta:{
        type: Date,
        require: [true, "A data da consulta é obrigatória"],
        validate:{
            validator: function(value){
                return value > new Date();
            },
            message:"A data deve ser futura"
        },
    },
    pacientes:{pacienteSchema},
    medicos:{MedicosSchema},

}, {versionKey: false}, {timestamps: true});



const consultas = mongoose.model("consultas", ConsultaSchema);

export default consultas;