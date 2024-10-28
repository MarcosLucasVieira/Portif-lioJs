import mongoose from "mongoose";

const ResidenteSchema = new mongoose.Schema({
    id:{
        type: mongoose.Types.ObjectId
    },
    nome: {
        type:String,
        required: [true, "O NOME DO(A) RESIDENTE É OBRIGATÓRIO"]
    },
    cpf:{
    type:String,
    match:[/^[0-9]{11}$/, "O CPF DO(A) RESIDENTE DEVE CONTER 11 DIGITOS"],
    required: [true, "O CPF DO(A) RESIDENTE É OBRIGATÓRIO"]
    },
    matricula:{
        type: String,
        match:[/^[0-9]{7}$/, "A MATRICULA DO(A) RESIDENTE DEVER CONTER 7 DIGITOS"],
        required:[true, "A MATRICULA DO(A) RESIDENTE É OBRIGATÓRIA"],
    }
})