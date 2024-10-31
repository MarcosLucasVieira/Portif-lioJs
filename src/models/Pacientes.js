import mongoose from "mongoose";

const pacienteSchema = new mongoose.Schema({
    id:{
            type: mongoose.Types.ObjectId},
    nome:{
            type: String,
            required: [true, "O NOME DO(A) PACIENTE É OBRIGATÓRIO"]},
    cpf:{
            type:String,
            required:[true, "O CPF DO(A) PACIENTE É OBRIGATÓRIO"],
            match:/11/}
}, {versionKey: false});

const pacientes = mongoose.model("pacientes", pacienteSchema);

export  {pacientes, pacienteSchema};