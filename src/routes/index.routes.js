//Este modulo es el encargado de asignar las peticiones en sus respectivas rutas
const {Router} = require('express'); //solo requerimos el objeto "Router" del modulo express
const {renderIndex, renderAbout} = require('../controllers/index.controller.js')

const router = Router();

router.get('/', renderIndex);

router.get('/about', renderAbout);

module.exports = router;