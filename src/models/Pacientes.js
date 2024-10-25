import mongoose from "mongoose";

const pacienteSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId },
    nome:{type: String, required: true},
    cpf:{type:Number, required:true}
}, {versionKey: false});

const pacientes = mongoose.model("pacientes", pacienteSchema);

export  {pacientes, pacienteSchema};