const {Schema, model} = require('mongoose');
const bcryptjs = require('bcryptjs');

//Creando Schema para la estructura de datos de nuestro modelo
const UserShema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}, {timestamps: true});

/*Metodos creados pertenecientes a la clase "UserShema"*/
/*-------------------------------------------------------------------------*/

//Metodo para encriptar "password" con modulo "bcryptjs"
UserShema.methods.encryptPassword = async password => {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);

};

//Metodo para comparar la password cifrada con la que esta en la base de dato
UserShema.methods.matchPassword = async function(password){
    return await bcryptjs.compare(password,this.password)
}

//creamos el modelo enviando los parametros nombre y el shema creado
module.exports = model('User', UserShema);