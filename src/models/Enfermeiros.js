import mongoose from "mongoose";

const EnfermeirosSchema = new mongoose.Schema({
    id:{type: mongoose.Types.ObjectId},
    nome:{
             type:String,
             required:[true, "O nome do enfermeiro(a) é obrigatório"]},
    idade:{
             type:Number,
             min: [18, "A idade minima dever ser 18 anos"], // Especificando o mínimo de forma correta
            },
    coren:{
             type:String,
             required:[ true, "O Coren do enfermeiro(a) é origatório" ],
             mathc: /8/}
             
}, {versionKey: false});

const enfermeiros = mongoose.model("enfermeiros", EnfermeirosSchema);

export default enfermeiros;