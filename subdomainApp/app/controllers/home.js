/**
 * Created by Mario on 03.01.2017.
 */
var express = require('express');
var router = express.Router();
var app = express();

var path = require('path');

var fs = require('fs');
var config = require('../../../config');
var multipart = require('connect-multiparty');
var jwtDecode = require('jwt-decode');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');
var functions = require('../../../functions');
var admins = require('../helpers/adminsFunctions');

app.set('models', require('../../../app/models/home.js'));
var Employee = app.get('models').employee;
var Department = app.get('models').department;

router.get('/', function (req, res) {

    var subdomain = req.vhost[0] + "." + req.vhost[1];
    Employee.find({where: ["subdomain = ?", subdomain], attributes: ['id']}).then(function (employee) {
        if (!employee) res.json({success: false, message: "Nie znaleziono subdomeny"});
        else res.render('index.ejs');
    });
});

router.get('/current', function (req, res) {
    //var employeeToken = req.cookies['employee-access-token'];
    Employee.belongsTo(Department);
    var subdomain = req.vhost[0] + "." + req.vhost[1];
    Employee.find({
        where: ['subdomain = ?', subdomain],
        attributes: {exclude: ['password', 'departmentId']},
        include: [Department]
    }).then(function (employee) {
        if (employee) res.json({success: true, employee: employee});
        else res.json({success: false, message: "Nie znaleziono pracownika"});
    });
});

router.get('/timetablePath', function (req, res) {
    var subdomain = req.vhost[0] + "." + req.vhost[1];
    Employee.find({where: ["subdomain = ?", subdomain], attributes: ['id']}).then(function (employee) {
        if (!employee) res.json({success: false, message: "Nie znaleziono subdomeny"});
        else res.json({success: true, path: '/' + employee.id + '/timetable.pdf'});
    });
});

router.get('/login', function (req, res) {
    res.render('login.ejs');
});

router.post('/login', function (req, res) {
    // find the user
    var subdomain = req.vhost[0] + "." + req.vhost[1];
    Employee.find({where: {subdomain: subdomain, email: req.body.email}}).then(function (user) {
        // check if password matches
        if (!user) {
            res.json({success: false, message: 'Nieprawidłowy email'});
        } else {
            bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
                if (!isMatch) {
                    res.json({success: false, message: 'Nieprawidłowe hasło'});
                } else {
                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        subdomain: user.subdomain,
                        admin: false
                    }, config.secret);
                    res.cookie('employee-access-token', token);
                    // return the information including token as JSON
                    var last_logged = functions.getDateTime();
                    Employee.update({
                        last_logged: last_logged
                    }, {where: ["subdomain = ?", subdomain]}).then(function () {
                        res.json({
                            success: true,
                            message: 'Authentication success.',
                        });
                    });
                }
            });
        }
    });
});

router.use(function (req, res, next) {
    functions.checkLogin(req, res, next, 'employee-access-token');
});

router.get('/logout', function (req, res) {
    res.clearCookie('employee-access-token');
    res.json({message: "Pomyślnie wylogowano."});
});

router.post('/uploadAvatar', multipart({
    uploadDir: path.join(__dirname, '../../../public/')
}), function (req, res) {

    var subdomain = req.vhost[0] + "." + req.vhost[1];

    admins.uploadAvatar(req, res, subdomain);
});

router.post('/uploadTimetable', multipart({
    uploadDir: path.join(__dirname, '../../../public/')
}), function (req, res) {

    var subdomain = req.vhost[0] + "." + req.vhost[1];

    admins.uploadTimetable(req, res, subdomain);
});

router.post('/update', function (req, res) {
    var subdomain = req.vhost[0] + "." + req.vhost[1];

    var employeeObject = {
        academicTitle: req.body.academicTitle,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        function: req.body.function,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        building: req.body.building,
        room: req.body.room,
        tutorship: req.body.tutorship,
        mainPageInfo: req.body.mainPageInfo,
        password: req.body.password,
        departmentId: req.body.departmentID,
        avatarPath: req.body.avatarPath
    };

    admins.updateEmployee(req, res, subdomain, employeeObject);
});

module.exports = router;