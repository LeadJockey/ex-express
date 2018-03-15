const passport   = require('./passport');
const controller = require('./controller');
const user       = {};

user.promisify      = (req, res, next) => {
	//배경 : 비동기식 요청에 따른 반응의 동기성이 필요 할 때
	//문제 : callback hell
	//해결 : promise
	
	res.getTargetMethod = (method) => {
		const opts       = ['json', 'render', 'send'];
		let targetMethod = 'send';
		opts.forEach((value, index) => {
			if (method === value) {
				targetMethod = method;
			}
		});
		return targetMethod;
	};
	res.sendFromPromise = (promiseObj, method, extra) => {
		
		const targetMethod = res.getTargetMethod(method);
		promiseObj
			.then((result) => res[targetMethod]({status: 200, login: extra.login, data: result}))
			.catch((err) => res[targetMethod]({status: 500, err: err}))
	};
	
	next();
};
user.authenticatify = (req, res, next) => {
	res.locals.login = req.isAuthenticated();
	console.log('log - user/index : ', res.locals.login);
	next();
};
user.send           = (req, res) => res.sendFromPromise(req.promisedReq, 'send', {});
user.json           = (req, res) => res.sendFromPromise(req.promisedReq, 'json', {login: res.locals.login});

user.controller = controller;
user.passport   = passport;

module.exports = user;