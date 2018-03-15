const express = require('express');
const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
	res.render('index', {
		msg    : 'hello index',
		isLogin: res.locals.login || false
	});
});

module.exports = indexRouter;