//ESTUDIAR SOBRE PASSPORT
//Libreria para la autenticacion de usuarios
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; //requerimos y guardamos un modulo especifico de "passport-local"
const User = require('../models/User');

//haremos la configuracion como una especie de middleware
passport.use(new LocalStrategy({ //La creacion del "LocalStrategy nos comprobara los permisos del usuario"
    usernameField: 'email_log', //extraer los datos desde la vista
    passwordField: 'password'
}, async (email, password, done) => {

    //Match email's user
    const user = await User.findOne({email});
    if(!user){
        return done(null, false, {message: 'Not user found'});
    }else{
        //Match password user
        const match = await user.matchPassword(password);
        if(match){
            return done(null, user)
        }else{
            return done(null, false, {message: 'Incorrect Password'});
        }

    }

}));

//funcion para guardar al usuario autorizado en la session del servidor
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//funcion para obtener los datos del usuario para terminar con su session
passport.deserializeUser(async (id, done) => {
    await User.findById(id, (err, user) => {
        done(err, user);
    })
});