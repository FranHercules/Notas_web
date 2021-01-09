//Revisar informacion de "index.routes.js"
const {Router} = require('express');

const router = Router();
const {
    renderNoteForm, createNewNote, 
    renderNotes, renderEditForm, 
    updateNote, deleteNote } = require('../controllers/notes.controller');

//Rutas para nueva nota
router.get('/notes/add',renderNoteForm); //peticion "get" para mostrar el formulario
router.post('/notes/new-note',createNewNote); //peticion "post" para enviar los datos del formulario

//Obtener notas
router.get('/notes',renderNotes);

//Actualizar notas
router.get('/notes/edit/:id',renderEditForm);
router.put('/notes/edit/:id', updateNote);

//Eliminar notas
router.delete('/notes/delete/:id',deleteNote);

module.exports = router;