import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
  validator: (valor) => valor.trim() !== "",
  message: ({path}) => `Um dos campos ${path} foi fornecido em branco`});