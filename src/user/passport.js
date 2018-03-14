const passport       = require('passport');
const LocalStrategy  = require('passport-local').Strategy;
const service        = require('./service');
const strategyOption = {};

strategyOption.local = {
	usernameField    : 'userEmail',
	passwordField    : 'userPwd',
	session          : true, // 세션에 저장 여부
	passReqToCallback: false
};

passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
	console.log('passport:serializeUser');
	done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
});

passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
	console.log('passport:deserializeUser');
	done(null, user); // 여기의 user가 req.user가 됨
});

passport.use('local-login', new LocalStrategy(strategyOption.local, service.login));

module.exports = passport;