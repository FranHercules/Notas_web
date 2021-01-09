//El modulo "express" nos ayudara a crear nuestro servidor

/*El modulo "path" nos permite obtener la ruta en la que se encuentra
el archivo dependiente del sistema operativo*/
const express = require('express');
const path = require('path');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const { title, nextTick } = require('process');
const morgan = require('morgan');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const methodOverride = require('method-override');
const flash = require('connect-flash'); //Nos permite enviar mensajes y recibirlos en un req
const session = require('express-session'); //Nos permite almacenar los mensajes

// Initilizations----------
const app = express();

// Settings----------
//Se hacen las cofiguraciones necesarias para express
app.set('port', process.env.PORT || 4000); //se indica que el la variable "port" de express sera tomada de variable de entorno
app.set('views', path.join(__dirname, 'views'));//se indica la ruta en donde esta la carpeta "views"
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));//Se ha configurado el motor de plantilla a utilizar
app.set('view engine', '.hbs');//Se establece el motor de plantilla a utilizar

// Middlewares----------
//Son funciones que tienen acceso al request de la peticion y se ejecutan antes de los controladores
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //Se indica que express sea capaz de entender datos de un fomulario
app.use(methodOverride('_method'));
app.use(session({ //configuraciones por defecto
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

// Global Variables---------
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    next();
});

// Routes------------
/*Se asignan las rutas a existir en nuestra web
y las acciones a ejecutar en cada una dependiendo su peticion*/
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));

// Static Files---------
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
