var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var resourcesRouter = require('./routes/resources');
var genresRouter = require('./routes/genres');
var tracksRouter = require('./routes/tracks');
var authRouter = require('./routes/auth');

const passport = require('passport');
const { localAuthStrategy } = require('./routes/strategies/local');
const { jwtAuthStrategy } = require('./routes/strategies/jwt');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize auth strategies config
localAuthStrategy;
jwtAuthStrategy;

app.use('/', indexRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', passport.authenticate('jwt', { session: false }), usersRouter);
app.use('/api/v1/resources', resourcesRouter);
app.use('/api/v1/genres', genresRouter);
app.use('/api/v1/tracks', tracksRouter);

module.exports = app;
