const express        = require('express');
const app            = express();
const path           = require('path');
const mongoose       = require('mongoose');
const database       = mongoose.connection;
const user           = require('./user');
const indexRouter    = require('./routes');
const userRouter     = require('./routes/user');
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

//app routing setting
app.use('/',indexRouter);

// user routing setting
app.use(user.promisify);
app.use(user.authenticatify);
app.use('/user', userRouter(user));

//error page handler
app.use('*', (req, res) => res.json({status: 404}));

//app server setting
app.listen(app.get('port'), () => console.log(`log - server:listening on port ${app.get('port')}`));



