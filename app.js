var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');


var vhost = require('vhost');

var home = require('./app/controllers/home');
var employees = require('./app/controllers/employees');
var admins = require('./app/controllers/admins');
var tickets = require('./app/controllers/tickets');
var departments = require('./app/controllers/departments');
var institutes = require('./app/controllers/institutes');
var employee_subdomain = require('./app/controllers/employee_subdomain');

var subdomainApp = require('./subdomainApp');
//var subdomains = require('./subdomains');

var port = process.env.PORT || 4730;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(cookieParser());

app.use(vhost('*.*.localhost', subdomainApp));

app.use(express.static(path.join(__dirname, 'app/views')));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

app.use('/employees', employees);
app.use('/departments', departments);
app.use('/institutes', institutes);
app.use('/tickets', tickets);
//app.use('/worker', worker);
// app.use(vhost('m.kraska.localhost', new_worker));
// app.use(vhost('api.localhost', new_worker));
// for(var i = 0; i < subdomains.length; i++)
// {
//     app.use(vhost(subdomains[i]+'.localhost', employee_subdomain));
// }

app.use('/admin', admins);
app.use('/', home);
//require('./config/routes.js')(app);

app.listen(port);
console.log('The magic happens on port ' + port);