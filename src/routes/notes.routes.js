//Revisar informacion de "index.routes.js"
const {Router} = require('express');

const router = Router();
const {
    renderNoteForm, createNewNote, 
    renderNotes, renderEditForm, 
    updateNote, deleteNote 
} = require('../controllers/notes.controller');

const {isAuthenticated} = require('../helpers/auth');//Middleware creado para verificar autenticacion en la ruta


//Rutas para nueva nota
router.get('/notes/add',isAuthenticated,renderNoteForm); //peticion "get" para mostrar el formulario
router.post('/notes/new-note',createNewNote); //peticion "post" para enviar los datos del formulario

//Obtener notas
router.get('/notes',isAuthenticated,renderNotes);

//Actualizar notas
router.get('/notes/edit/:id',isAuthenticated,renderEditForm);
router.put('/notes/edit/:id',isAuthenticated,updateNote);

//Eliminar notas
router.delete('/notes/delete/:id',isAuthenticated,deleteNote);

module.exports = router;