const   mongoose = require("mongoose");
const  Schema=  mongoose.Schema;

const   perfilLaboralSchema= new Schema({
        idUsuario:String,
        dedicarse:String,
        estudia:Boolean,
        institucion:String,
        trabaja:Boolean,
        tiempoParaPrimerTrabajo:String,
        comoloobtuvo:String,
        requisitos:String,
        idiomaTrabajo:String,
        porcentajeIextranjero:String,
        antiguedad:String,
        ingresosM:String,
        jerarquiaEnT:String,
        TipoDContrado:String,
        Relacionformacion:String,
        organizmo:String,
        Giro:String,
        RazonSocial:String,
        CP:String,
        CalleNo:String,
        telfono:String,
        email:String,
        nombreJefeI:String,
        SectorPrimario:String,
        SectorSegundario:String,
        SectorTercario:String,
        sizeOrganizacon:String
});

module.exports = mongoose.model("perfilLaboral",perfilLaboralSchema);
