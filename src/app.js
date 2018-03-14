const express        = require('express');
const app            = express();
const path           = require('path');
const mongoose       = require('mongoose');
const database       = mongoose.connection;
const user           = require('./user');
const morgan         = require('morgan');
const expressSession = require('express-session');

//app config setting
app.set('port', 3000);
app.set('databaseUrl', 'mongodb://localhost/test');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app database setting
database.on('error', console.error);
database.once('open', () => console.log('log - database:connected to mongo'));
mongoose.connect(app.get('databaseUrl'));

//app middleware setting
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded()); // for parsing application x-www-form-urlencoded
app.use(morgan('dev'));
app.use(expressSession({secret: 'my key', resave: true, saveUninitialized: true}));
app.use(user.passport.initialize()); // passport 구동
app.use(user.passport.session()); // 세션 연결

//로그인 여부 확인 미들웨어
app.use(function (req, res, next) {
	res.locals.login = req.isAuthenticated();
	console.log('login : ', res.locals.login);
	next();
});

//app routing setting
app.get('/', (req, res) => res.render('index', {
	msg    : 'hello index',
	isLogin: res.locals.login
}));

// user routing setting
app.use(user.promisify);
const userRouter = express.Router();

userRouter.get('/list', user.controller.getUsers, user.json);
userRouter.get('/next', (req, res) => res.render('index', {
	msg    : 'next',
	isLogin: res.locals.login
}));
userRouter.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

userRouter.get('/signup', (req, res) => res.render('signup', {msg: 'signup'}));
userRouter.post('/signup', user.controller.createUser, (req, res) => res.redirect('/'));

userRouter.get('/login', (req, res) => res.render('login', {msg: 'login'}));
userRouter.post('/login', user.passport.authenticate('local-login', {
	successRedirect: '/user/list',
	failureRedirect: '/user/login'
}));
app.use('/user', userRouter);

//error page handler
app.use('*', (req, res) => res.json({status: 404}));

//app server setting
app.listen(app.get('port'), () => console.log(`log - server:listening on port ${app.get('port')}`));



