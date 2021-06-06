const   mongoose = require("mongoose");
const  Schema=  mongoose.Schema;

const   perfilProfecionalSchema= new Schema({
   campoEstudio:String,
   titulacion:String,
   experiencialaboral:String,
   competencialaboral:String,
   idiomasExtranjeros:String,
   Recomendaciones:String,
   personalidad:String,
   sapacidad:String
});

module.exports = mongoose.model("perfilProfecional",perfilProfecionalSchema);

