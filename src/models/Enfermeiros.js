import mongoose from "mongoose";

const EnfermeirosSchema = new mongoose.Schema({
    id:{type: mongoose.Types.ObjectId},
    nome:{
             type:String,
             required:[true, "O nome do enfermeiro(a) é obrigatório"]},
    idade:{
             type:Number},
    coren:{
             type:String,
             required:[ true, "O Coren do enfermeiro(a) é origatório" ],
             mathc: /8/}
}, {versionKey: false});

const enfermeiros = mongoose.model("enfermeiros", EnfermeirosSchema);

export default enfermeiros;