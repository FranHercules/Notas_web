//Del modulo "mongosee" solo se utilizaran dos propiedades
const {Schema, model} = require('mongoose');

//Creacion del esquema para notas
//Los esquemas son estructuras para los datos que se guardaran en la base de datos
const NoteShema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {timestamps: true}) //La propiedad "timestamps" habilita que las propiedades propias
                       //de moongose CreatedAt y UpdatedAt sean requeridas en este esquema

//Se crea el modelo o la clase para manejar datos en MongoDB
//enviandose como parametros el modulo y el esquema
//El modelo se exportara para ser requerido luego
module.exports = model('Notes', NoteShema);