//Funciones encargadas para actuar y responder en las rutas
const IndexCrtl = {}; //Se crea el objeto primeramente vacio

//funcion encargada de mostrar informacion en la ruta principal
IndexCrtl.renderIndex = (req, res) => {
    res.render('index')
};

IndexCrtl.renderAbout = (req, res) => {
    res.render('about')
};

module.exports = IndexCrtl;