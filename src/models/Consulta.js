import mongoose from "mongoose";

const ConsultaSchema = new mongoose.Schema({
    id: { type: mongoose.Types.ObjectId },

    medico: {
        type: mongoose.Types.ObjectId,
        ref: "medicos",
        required: [true, "O(a) medico é obrigatório"]
    },
    paciente: {
        type: mongoose.Types.ObjectId,
        ref: "pacientes",
        required: [true, "O(a) paciente é obrigatório"]
    },
    dataConsulta: {
        type: Date,
        required: [true, "A data da consulta é obrigatória"],
        validate: {
            validator: function (value) {
                return value > new Date();
            },
            message: "A data deve ser futura"
        },
    }
}, { versionKey: false, timestamps: true });

const consultas = mongoose.model("consultas", ConsultaSchema);

export default consultas;
