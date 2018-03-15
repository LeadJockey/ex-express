/*
* data-access : DAL - data access layer
* 데이터에 접근하기 위한 계층으로 정의
* 몽고디비를 사용하는 현재 상황에서는 database 에서 데이터를 받아 올수 있는 함수형 쿼리들의 집합
* */
const User   = require('./user-schema');
const method = {};

// 유저 생성
method.createUser = (userEmail, userPwd, userName) => {
	const newUser     = new User();
	newUser.userEmail = userEmail;
	newUser.userPwd   = userPwd;
	newUser.userName  = userName;
	const query       = newUser.save();
	return query.then(() => `created user ${userName}`)
							.catch((err) => err);
};

//유저 수정
method.updateUser = (req) => {
	const query = User.update({userEmail: req.body.userEmail}, {$set: req.body});
	return query.then(() => 'status:200').catch((err) => err);
};

//유저 삭제
method.deleteUser = (req) => {
	const query = User.remove({userEmail: req.body.userEmail});
	return query.then(() => {
		console.log('log - DA : delete / status:200')
	}).catch((err) => err);
};


// 모든 유저리스트를 가져온다
method.getUsers = () => {
	const query = User.find({}, 'userEmail userPwd userName');
	return query.select('userEmail userPwd userName')
							.then((users) => users)
							.catch((err) => err);
};

// userEmail 으로 유저 한명을 찾기
method.getUserByUserEmail = (userEmail, userPwd, done) => {
	const query = User.findOne({userEmail: userEmail}, 'userEmail userPwd userName');
	return query.select('userEmail userPwd userName')
							.then((user) => !user ? done(null, false) : user)
							.then((user) => user.comparePassword(userPwd) ? done(null, user) : done(null, false))
							.catch((err) => done(err));
};

module.exports = method;

