//Este modulo nos permite la conexion con la base de datos
/* "dotenv" nos permite utilizar las variables de entorno para no 
especificar datos sensibles en nuestro codigo*/
const mongoose = require('mongoose');
require('dotenv').config();

//Se obtienen los datos desde las variables de entorno
//Se concatenan los datos en un solo string
const {HOST_MONGODB, DATABASE_MONGODB} = process.env;
const MONGODB_URI = `mongodb://${HOST_MONGODB}/${DATABASE_MONGODB}`;

//Establecemos la conexion con la base de datos
//se mandan como parametros la URI con configuraciones requeridas
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(db => {
    console.log('Database is connected')
}).catch(err => console.log(err))

//module.exports = mongoose;