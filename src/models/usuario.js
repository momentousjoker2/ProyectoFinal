const   mongoose = require("mongoose");
const  Schema=  mongoose.Schema;

const   usuarioSchema= new Schema({
    idUsuario:String,
    email:String,
    password:String,
});

module.exports = mongoose.model("usuario",usuarioSchema);


