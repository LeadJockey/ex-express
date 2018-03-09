const controller = require('./controller');
const user       = {};

user.controller = controller;

user.promisify  = (req, res, next) => {
	//배경 : 비동기식 요청에 따른 반응의 동기성이 필요 할 때
	//문제 : callback hell
	//해결 : promise
	
	const opts = ['json', 'render', 'send'];
	
	res.sendFromPromise = (promiseObj) => {
		promiseObj
			.then((result) => res.send(result))
			.catch((err) => res.send(err))
	};
	
	next();
};

user.render     = (req, res) => {
	res.sendFromPromise(req.promisedReq);
};

module.exports  = user;