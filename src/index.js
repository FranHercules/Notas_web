//Se mandan a llamar todos los archivos necesarios para arrancar el proyecto
//Se levanta el server
//Se establece conexion con la base
const app = require('./server');
require('./database');
require('dotenv').config();//Dotenv tiene acceso a las variables de entorno

//console.log(process.env.MONGODB_URI);

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})//El server asigna el puerto en el que escuchara el proyecto