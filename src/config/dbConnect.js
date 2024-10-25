import mongoose from "mongoose"
 
async function conectar(){
 mongoose.connect(process.env.DB_CONECTAR_STRING);

 return mongoose.connection;

};

export default conectar;