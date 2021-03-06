//Funciones encargadas para actuar y responder en "notes.routes.js"
const notesCrtl = {};

const Note = require('../models/Note');

notesCrtl.renderNoteForm = (req, res) => {
    res.render('notes/new-note');
};

notesCrtl.createNewNote = async (req, res) => {
    console.log(req.body);
    const {title, description} = req.body;
    const newNote = new Note({title: title, description: description}); //creando el objeto a traves del modelo "Note"
    //otra forma: Note({title, description
    newNote.user = req.user.id; //Se consigue el user gracias al modulo passport y se agrega su id a la BD
    
    await newNote.save(); //metodo de moongose para guardar el nuevo objeto de moongose creado

    //asignamos el mensaje que guardara la variable global
    req.flash('success_msg', 'Note Added Successful');
    res.redirect('/notes')
};

notesCrtl.renderNotes = async (req, res) => {
    const id = req.user.id;
    const notes = await Note.find({user: id}).sort({createdAt: 'desc'});
    res.render('notes/all-notes', {notes});
};

notesCrtl.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id);
    if(note.user != req.user.id){
        req.flash('error_msg', 'Not Authorized');
        return res.redirect('/notes');
    }
    console.log(note);
    res.render('notes/edit-note', {note}); 
};

notesCrtl.updateNote = async (req, res) => {
    const {title, description} = req.body;
    const id = req.params.id;
    await Note.findByIdAndUpdate(id, {title: title, description: description});
    req.flash('success_msg', 'Note Update Successfully');
    res.redirect('/notes');
    //await Note.update

}

notesCrtl.deleteNote = async (req, res) => {
    const id = req.params.id;
    await Note.findByIdAndDelete(id);
    //const notes = await Note.find();
    console.log(id);
    req.flash('success_msg', 'Note Deleted Successfully')
    res.redirect('/notes');

    //res.send('Se elimino ${id}');
    //notes.remove();

    //const notes = await Note.find(req.body._id);
}

module.exports = notesCrtl;