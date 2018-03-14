/*
* controller : controller
* route 를 통해서 들어온 요청에 대한 알맞은 service.method 를 연결 시키는 파일
* */
const service    = require('./service');
const controller = {};

// 회원가입 화면
// controller.getSignUp = (req, res) => res.json({view: 'sign-up'});

// 회원가입
// controller.postSignUp = (req, res) => service.createUser(req, res);

// 유저리스트 화면
controller.getUsers = (req, res, next) => {
	req.promisedReq = service.getUsers();
	next();
};

// 회원가입 화면
controller.createUserView = (req,res,next)=>{
	next()
};

// 회원가입 버튼
controller.createUser = (req,res,next)=>{
	req.promisedReq = service.createUser(req);
	next();
};




module.exports = controller;