//Este archivo actuara como un middleware
//Su funcion es comprobar que la ruta tiene autorizacion
const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){ //El metodo "isAuthenticated" nos lo facilita la libreria "passport"
        return next();
    }
    req.flash('error_msg', 'Not Authorized');
    res.redirect('/users/signin'); //Si no tiene autorizacion se redirige a "signin"
}

module.exports = helpers;