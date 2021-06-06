const   mongoose = require("mongoose");
const  Schema=  mongoose.Schema;


const   entrevista= new Schema({
    idUsuario:String,
   Pregunta1:String,
   Pregunta2:String,
   Pregunta3:String,
   Pregunta4:String,
   Pregunta5:String,
   Pregunta6:String,
   Pregunta7:String,
   Pregunta8:String,
   Pregunta9:String,
});

module.exports = mongoose.model("perfilLaboral",perfilLaboralSchema);
