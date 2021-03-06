/*
* service : business logic layer
*
* web 과 완전히 분리 되어서 사용될 수 있는 함수 ( method ) 들의 집합
* DAL 에서 가져온 데이터를 정제하는 메서드들의 집합
* */
const da     = require('./data-access');
const method = {};

// 회원가입 요청 시
method.createUser = (req) => {
	const body      = req.body;
	const userEmail = body.userEmail || '';
	const userPwd   = body.userPwd || '';
	const userName  = body.userName || '';
	return da.createUser(userEmail, userPwd, userName);
};
// 수정 요청 시
method.updateUser = (req) => da.updateUser(req);

// 탈퇴 요청 시
method.deleteUser = (req) => da.deleteUser(req);

// 회원리스트에 대한 요청 시
method.getUsers = () => da.getUsers();
// 회원정보 요청시
// method.getUser = (userEmail) => da.getUserByUserEmail();

// 로그인 요청에 대한 요청 시
method.login = (userEmail, userPwd, done) => da.getUserByUserEmail(userEmail, userPwd, done);


module.exports = method;