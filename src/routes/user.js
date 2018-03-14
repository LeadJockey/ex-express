const express    = require('express');
const userRouter = express.Router();

module.exports = (user) => {
	userRouter.get('/list', user.controller.getUsers, user.json);
	userRouter.get('/next', (req, res) => res.render('index', {
		msg    : 'next',
		isLogin: res.locals.login
	}));

	
	userRouter.get('/signup', (req, res) => res.render('signup', {msg: 'signup'}));
	userRouter.post('/signup', user.controller.createUser, (req, res) => res.redirect('/'));
	
	userRouter.get('/login', (req, res) => res.render('login', {msg: 'login'}));
	userRouter.post('/login', user.passport.authenticate('local-login', {
		successRedirect: '/user/list',
		failureRedirect: '/user/login'
	}));
	
	userRouter.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});
	
	
	
	
	return userRouter;
};