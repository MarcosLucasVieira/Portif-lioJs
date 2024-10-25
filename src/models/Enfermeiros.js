import mongoose from "mongoose";

const EnfermeirosSchema = new mongoose.Schema({
    id:{type: mongoose.Schema.Types.ObjectId},
    nome:{type:String, required:true},
    idade:{type:Number},
    coren:{type:Number, required: true}
}, {versionKey: false});

const enfermeiros = mongoose.model("enfermeiros", EnfermeirosSchema);

export default enfermeiros;