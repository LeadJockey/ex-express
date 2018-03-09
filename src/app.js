const express  = require('express');
const app      = express();
const config   = require('./config');
const mongoose = require('mongoose');
const database = mongoose.connection;
const user     = require('./user');

//app config setting
app.set('port', config.port);
app.set('databaseUrl', config.databaseUrl);

//app database setting
database.on('error', console.error);
database.once('open', () => console.log('log - database:connected to mongo'));
mongoose.connect(app.get('databaseUrl'));

//app middleware setting
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded()); // for parsing application x-www-form-urlencoded
app.use((req, res, next) => {
	console.log('log - middle:req.url -> ', req.url);
	next();
});

//app routing setting
app.get('/', (req, res) => res.json({msg: 'hello index'}));

// user routing
app.use(user.promisify);
app.get('/users', user.controller.getUsers, user.render);


//app server setting
app.listen(app.get('port'), () => console.log(`log - server:listening on port ${app.get('port')}`));



