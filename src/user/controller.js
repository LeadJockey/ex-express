/*
* controller : controller
* route 를 통해서 들어온 요청에 대한 알맞은 service.method 를 연결 시키는 파일
* */
const service    = require('./service');
const controller = {};

// 유저리스트 화면
controller.getUsers = (req, res, next) => {
	req.promisedReq = service.getUsers();
	next();
};

// 회원정보 화면
controller.getUser = (req,res,next)=>{
	// req.promisedReq = service.getUSer();
	next();
};

// 회원정보 수정 화면
controller.updateUser = (req,res,next)=>{
	req.promisedReq = service.updateUser(req);
	next();
};

// 탈퇴 버튼
controller.deleteUser = (req,res,next)=>{
	req.promisedReq = service.deleteUser(req);
	next();
};

// 회원가입 화면
controller.createUserView = (req, res, next) => {
	next()
};

// 회원가입 버튼
controller.createUser = (req, res, next) => {
	req.promisedReq = service.createUser(req);
	next();
};


module.exports = controller;