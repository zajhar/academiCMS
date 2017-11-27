var express = require('express');
var path = path = require('path');


var app = express();

var home = require('./app/controllers/home');
var admins = require('./app/controllers/admins');
var news = require('./app/controllers/news');
var tickets = require('./app/controllers/tickets');
var subjects = require('./app/controllers/subjects');
var statics = require('./app/controllers/statics');

app.use(express.static(path.join(__dirname, 'app/views')));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// app.use(express.logger('dev'));
// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/static', statics);
app.use('/news', news);
app.use('/tickets', tickets);
app.use('/admin', admins);
app.use('/subjects', subjects);
app.use('/', home);

module.exports = app;