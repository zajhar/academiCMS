/**
 * Created by Mario on 20.12.2016.
 */
var express = require('express');
var router = express.Router();
var app = express();

var fs = require('fs');
var config = require('../../config');
var jwt = require('jsonwebtoken');
var jwtDecode = require('jwt-decode');
var bcrypt = require('bcrypt-nodejs');
var functions = require('../../functions');

app.set('models', require('../models/home.js'));
var Employee = app.get('models').employee;
var Department = app.get('models').department;
var Ticket = app.get('models').ticket;
var News = app.get('models').news;

// router.use(function (req, res, next) {
//     var subdomain = req.vhost[0]+"."+req.vhost[1]; // username is the "*"
//
//     // pretend request was for /{username}/* for file serving
//     req.originalUrl = req.url;
//     req.url = '/' + subdomain + req.url;
//
//     console.log(req.url);
//
//     //next();
// });

router.get('/', function (req, res) {
    // functions.getFilesCount(functions.getDir(40));
    // functions.getFilesSize(functions.getDir(40));
    var subdomain = req.vhost[0] + "." + req.vhost[1];
    Employee.find({where: ["subdomain = ?", subdomain], attributes: ['id']}).then(function (json) {
        if (json) {
            res.render(functions.getDir(json.id) + "index.ejs", function (err, html) {
                if (err) res.json({success: true, id: json.id});
                else res.send(html);
            });
        } else res.json({success: false, message: "Nie znaleziono subdomeny"});
    });

    // Employee.belongsTo(Department);
    //
    // Employee.find({where: ["subdomain = ?", subdomain(req.headers.host)], attributes: ['academicTitle', 'firstName', 'lastName', 'email'], include: [Department]}).then(function (json) {
    //     res.json(json);
    // });
});

router.post('/upload', function (req, res) {
    var subdomain = req.vhost[0] + "." + req.vhost[1];
    Employee.find({where: ["subdomain = ?", subdomain], attributes: ['id']}).then(function (json) {
        // var newDestination = 'public/' + json.id + '/';
        // req.files.forEach(function(file) {
        //     fs.rename(file.path, newDestination+file.originalname, function (err) {
        //         if (err) throw err;
        //         console.log('file uploaded!');
        //     });
        // });
    });
    res.redirect('/');
});

router.post('/newsList', function (req, res) {
    var subdomain = req.vhost[0] + "." + req.vhost[1];
    Employee.find({where: ["subdomain = ?", subdomain], attributes: ['id']}).then(function (json) {
        if (json) {
            var page = req.body.page;
            var limit = parseInt(req.body.limit);

            if (page && limit) {
                News.findAndCountAll({
                    where: ['employeeID = ?', json.id],
                    offset: limit * (page - 1),
                    limit: limit
                }).then(function (json) {
                    res.json({success: true, results: json.count, list: json.rows});
                });
            } else {
                News.findAndCountAll({
                    where: ['employeeID = ?', json.id]
                }).then(function (json) {
                    res.json({success: true, results: json.count, list: json.rows});
                });
            }
        } else res.json({success: false, message: "Nie znaleziono subdomeny"});
    });
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

router.get('/admin', function (req, res) {
    res.json({success: true, message: "Witamy w panelu"});
});

router.get('/admin/current', function (req, res) {
    var currentLoggedEmployee = "";
    var employeeToken = req.cookies['employee-access-token'];

    if (employeeToken) currentLoggedEmployee = jwtDecode(employeeToken).subdomain;

    Employee.find({
        where: ['subdomain = ?', currentLoggedEmployee],
        attributes: {exclude: ['password']}
    }).then(function (employee) {
        res.json({employee: employee});
    });

});

router.post('/admin/addNews', function (req, res) {
    Employee.find({where: ["subdomain = ?", subdomain(req.headers.host)], attributes: ['id']}).then(function (json) {
        var employeeId = json.id;
        var title = req.body.title;
        var description = req.body.description;

        if (description && title) {
            var news = News.build({
                employeeId: employeeId,
                title: title,
                description: description,
                date: getDateTime()
            });
            res.json({success: true, message: "Dodano artykuł."});
            news.save();
        }
        else res.json({succes: false, message: "Nie podano id pracownika, tytułu bądź opisu artykułu."});
    });
});

router.post('/admin/removeNews', function (req, res) {
    var id = req.body.id;
    if (id) {
        News.destroy({where: ["id = ?", id]}).then(function () {
            res.json({success: true, message: "Artykuł usunięty."});
        });
    }
    else res.json({succes: false, message: "Nie podano ID artykułu."})
});

router.post('/admin/addTicket', function (req, res) {
    Employee.find({where: ["subdomain = ?", subdomain(req.headers.host)], attributes: ['id']}).then(function (json) {
        var employeeId = json.id;
        var opis = req.body.opis;

        if (opis) {
            var ticket = Ticket.build({
                employeeId: employeeId,
                description: opis,
                date: getDateTime()
            });
            res.json({success: true, message: "Dodano ticket."});
            ticket.save();
        }
        else res.json({succes: false, message: "Nie podano id pracownika bądź opisu ticketu."});
    });
});

module.exports = router;