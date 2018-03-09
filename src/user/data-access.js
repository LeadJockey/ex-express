/*
* data-access : DAL - data access layer
*
* 데이터에 접근하기 위한 계층으로 정의
* 몽고디비를 사용하는 현재 상황에서는 database 에서 데이터를 받아 올수 있는 함수형 쿼리들의 집합
* */
const User   = require('./user-schema');
const method = {};

// method.createUser = (email, pwd, name) => {
// 	const user     = new User();
// 	user.userEmail = email;
// 	user.userPwd   = pwd;
// 	user.userName  = name;
// 	return user.save((err) => {
// 		console.log(err);
// 		return err ? err : {status: 200}
// 	});
// };

method.getUsers = () => {
	
	return User.find({}).then((users) => users).catch((error) => error);
};

module.exports = method;

