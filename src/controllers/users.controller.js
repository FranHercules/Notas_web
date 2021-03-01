const usersCtrl = {};
const passport = require('passport');
const User = require('../models/User');


usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

usersCtrl.signup = async (req, res) => {
    const errors = [];
    const {name, email, password, confirm_pass} = req.body;

    if(password != confirm_pass){
        errors.push({text: 'Password do not match'});
    };

    if(password.length < 4){
        errors.push({text: 'Password must be at least 4 characters.'})
    };

    if(errors.length > 0){
        res.render('users/signup', {
            errors,
            name,
            email
        });
    }else{

        const emailUser = await User.findOne({email: email});
        if(emailUser){
            req.flash('error_msg', 'This email already in use');
            res.redirect('/users/signup');
        }else{
            const newUser = new User({name: name, email: email, password: password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'You are registered');
            res.redirect('/users/signin');
        };
    };

};

usersCtrl.renderSigninForm = (req, res) => {
    res.render('users/signin');
};
//Este controlador usa todos los recursos configurados en "config/passport"
//Validara cierta autenticacion que ya hemos definido anteriormente
usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin', //en caso de error redireccionar a...
    successRedirect: '/notes',
    failureFlash: true
});

//controlador para cerrar session
usersCtrl.logout = (req, res) => {
    req.logout(); //metodo "logout" es proporcionado por la libreria "passport"
    req.flash('success_msg', 'You are logged out now');

    res.redirect('/users/signin');
};

module.exports = usersCtrl;