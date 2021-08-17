const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utilities/catchAsync');
const User = require('../models/user');
const user = require('../controllers/users');

router.route('/register').get(user.renderRegister).post(catchAsync(user.registerUser));

router
	.route('/login')
	.get(user.renderLogin)
	.post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), user.login);

// router.get('/register', user.renderRegister );

// router.post('/register', catchAsync( user.registerUser));

//router.get('/login', user.renderLogin)

//router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), user.login)

router.get('/logout', user.logout);

module.exports = router;
