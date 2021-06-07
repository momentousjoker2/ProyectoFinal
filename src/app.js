//Importaciones
const url = require('url');
const morgan = require('morgan');
const path = require('path');
const express = require('express');
var session = require('express-session');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const { render } = require('ejs');
ObjectID = require('mongodb').ObjectID;
assert = require('assert');
const app = express();
const connectionString = "mongodb+srv://itcg:1234567890@cluster0.rtiaw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var ssn;
MongoClient.connect(connectionString, { useUnifiedTopology: true }).then(client => {

    console.log('Connected to Database')
    //BASE DE DATOS y tablas
    const db = client.db('Encuesta')
    const usuarios = db.collection('usuarios')
    const perfil = db.collection('perfil')
    const perfilProfecional = db.collection('perfilProfecional')
    const perfilLaboral = db.collection('perfilLaboral')
    const encuesta = db.collection('encuesta')

    //Rutas de archivos
    app.use(express.static('public'))
    app.set('views', path.join(__dirname, "/views/"))
    app.use(express.static(__dirname + "/static/"));
    app.use(session({
        secret: '2C44-4D44-WppQ38S',
        resave: true,
        saveUninitialized: true
    }))

    //Variables de server
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.set('view engine', 'ejs')
    app.use(morgan('dev'));
    app.use(express.urlencoded({ extended: false }))

    //Servidor Corriendo
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log('App listening on port ' + port));

    //rutas de servidor

    app.get('/', function (req, res) {
        if (!req.session.login)
            res.render('login.ejs');
        else
            res.redirect('/perfil')
    });

    app.get('/registro', function (req, res) {
        if (!req.session.login)
            res.render('registro.ejs');
        else
            res.redirect('/perfil')
    });

    app.post('/addRegistro', function (req, res) {
        usuarios.insertOne(req.body).then(result => { res.redirect('/') }).catch(error => console.error(error))
    });

    app.post('/login', async (req, res) => {
        let body = req.body;

        try {
            // Buscamos email en DB
            const usuarioDB = await usuarios.findOne({ email: body.email });
            // Evaluamos si existe el usuario en DB
            if (!usuarioDB) {
                console.log(usuarioDB)
                return res.redirect("/")
            }
            // Evaluamos la contraseña correcta
            if (!(body.password == usuarioDB.password)) {
                return res.redirect("/")
            }
            // Pasó las validaciones
            req.session.idUsuario = usuarioDB._id;
            req.session.login = true;
            return res.redirect("/perfil");

        } catch (error) {
        }
    });

    app.get('/perfil', async (req, res) => {
        if (req.session.login) {

            perfilP = await perfil.findOne({ idUsuarios: req.session.idUsuario });

            if (perfilP == null) {
                perfilP = new Object();
                perfilP.idUsuarios = req.session.idUsuario
            }
            res.render('perfil.ejs', { 'datos': perfilP })
        } else {
            res.redirect('/')
        }
    });

    app.post('/perfil', function (req, res) {
        id = req.body._id;

        if (ObjectID.isValid(id))
            req.body._id = ObjectID(id)
        else
            delete req.body._id

        perfil.save(req.body).then(result => { res.redirect('/perfil') }).catch(error => console.error(error))
    });

    app.get('/perfilLaboral', async (req, res) => {
        if (req.session.login) {

            perfilLa = await perfilLaboral.findOne({ idUsuarios: req.session.idUsuario });

            if (perfilLa == null) {
                perfilLa = new Object();
                perfilLa.idUsuarios = req.session.idUsuario
            }
            res.render('PerfilLaboral.ejs', { 'datos': perfilLa })
        } else {
            res.redirect('/')
        }
    });

    app.post('/perfilLaboral', function (req, res) {
        id = req.body._id;

        if (ObjectID.isValid(id))
            req.body._id = ObjectID(id)
        else
            delete req.body._id

        perfilLaboral.save(req.body).then(result => { res.redirect('/perfilLaboral') }).catch(error => console.error(error))
    });


    app.get('/perfilProfecional', async (req, res) => {
        if (req.session.login) {

            perfilPro = await perfilProfecional.findOne({ idUsuarios: req.session.idUsuario });

            if (perfilPro == null) {
                perfilPro = new Object();
                perfilPro.idUsuarios = req.session.idUsuario
            }
            res.render('perfilProfecional.ejs', { 'datos': perfilPro })
        } else {
            res.redirect('/')
        }

    });

    app.post('/perfilProfecional', function (req, res) {
        id = req.body._id;

        if (ObjectID.isValid(id))
            req.body._id = ObjectID(id)
        else
            delete req.body._id

        perfilProfecional.save(req.body).then(result => { res.redirect('/perfilProfecional') }).catch(error => console.error(error))
    });


    app.get('/encuesta', async (req, res) => {
        if (req.session.login) {

            encuestas = await encuesta.findOne({ idUsuarios: req.session.idUsuario });

            if ((encuestas == null)) {
                encuestas = new Object();
                encuestas.idUsuarios = req.session.idUsuario
                res.render('encuesta.ejs', { 'datos': encuestas })
            } else {
                res.render('encuestaRealizadad.ejs')
            }

        } else {
            res.redirect('/')
        }
    });


    app.post('/encuesta', function (req, res) {
        console.log(req.body)
        encuesta.insertOne(req.body).then(result => { res.render('encuestaRealizadad.ejs') }).catch(error => console.error(error))
    });

    app.get('/logout', function (req, res) {
        req.session.destroy();
        res.redirect('/')

    });

    app.get('/resultados', async (req, res) => {
        nPerfil = await perfil.find({});
        nPerfil= await nPerfil.toArray()
        
        nPerfilL = await perfilLaboral.find({});
        nPerfilL= await nPerfilL.toArray()

        nPerfilP = await perfilProfecional.find({});
        nPerfilP= await nPerfilP.toArray()
        
        encuestas = await encuesta.find({});
        encuestas= await encuestas.toArray()

        console.log(nPerfil);
        console.log(nPerfilL);
        console.log(nPerfilP);
        console.log(encuestas);

        res.render('resultados.ejs', { 'nPerfil': nPerfil ,"nPerfilL":nPerfilL,"nPerfilP":nPerfilP,"encuestas":encuestas})


    });




}).catch(error => console.error(error))





