const express    = require('express');
const userRouter = express.Router();

module.exports = (user) => {
	// 회원 리스트
	userRouter.get('/list', user.controller.getUsers, user.json);
	// 회원 리스트 로그인 후
	userRouter.get('/next', (req, res) => res.render('index', {
		msg    : 'next',
		isLogin: res.locals.login
	}));
	// 회원가입 화면
	userRouter.get('/signup', (req, res) => res.render('signup', {msg: 'signup'}));
	// 회원가입 요청
	userRouter.post('/signup', user.controller.createUser, (req, res) => res.redirect('/'));
	// 회원정보 화면
	userRouter.get('/info', (req, res) => {
		if(req.session.passport){
			res.render('info', {msg: 'info',user:req.session.passport.user});
		}else{
			res.redirect('/user/login');
		}
	});
	// 회원정보 수정화면
	userRouter.get('/update', (req, res) => {
		if(req.session.passport){
			res.render('update', {msg: 'update',user:req.session.passport.user});
		}else{
			res.redirect('/user/login');
		}
	});
	// 회원정보 수정 요청
	userRouter.post('/update', user.controller.updateUser, (req, res) => res.redirect('/user/info'));
		// put/delete 요청은 서버쪽 레필이 필요함 <form 테그에서는 get/post 만을 지원함으로 ...
		// 출처 - https://stackoverflow.com/questions/8054165/using-put-method-in-html-form
		// userRouter.put('/update', user.controller.updateUser, (req, res) => res.redirect('/user/info'));
	
	// 회원삭제 요청
		// userRouter.delete('/leave', user.controller.deleteUser, (req, res) => res.redirect('/user/list'));
	userRouter.post('/leave', user.controller.deleteUser, (req, res) => res.redirect('/user/list'));
	
	// 로그인 화면
	userRouter.get('/login', (req, res) => res.render('login', {msg: 'login'}));
	// 로그인 요청
	userRouter.post('/login', user.passport.authenticate('local-login', {
		successRedirect: '/user/next',
		failureRedirect: '/user/login'
	}));
	// 로그아웃 화면(요청) - 로그아웃 실행 - 인덱스로 리다이렉트
	userRouter.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});
	return userRouter;
};