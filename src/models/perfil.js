const   mongoose = require("mongoose");
const  Schema=  mongoose.Schema;

const   perfilSchema= new Schema({
    idUsuario:String,
    password:String,
    nombre:String,
    apellidoP:String,
    apellidoM:String,
    fechaNacimiento:Date,
    curp:String,
    genero:String,
    estadoCivil:String,
    cp:Number,
    calleN:String,
    tMovil:String,
    tParticula:String,
    Email:String,
    carrera:String,
    Especialidad:String,
    nControl:String,
    yearEgreso:Number,
    mesEgreso:Number,
    titulado:Boolean,
    manejaPaquetesComputacionales:String
});

module.exports = mongoose.model("perfil",perfilSchema);


