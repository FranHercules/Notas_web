const {Router} = require('express');
const router = Router();

const {
    renderSignUpForm,
    signup,renderSigninForm,
    signin, logout} = require('../controllers/users.controller');
const app = require('../server');

//Login
router.get('/users/signup', renderSignUpForm);
router.post('/users/signup', signup);

//Register
router.get('/users/signin', renderSigninForm);
router.post('/users/signin', signin);

//logout
router.get('/users/logout', logout);

module.exports = router;