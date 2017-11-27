/**
 * Created by Mario on 10.12.2016.
 */
var express = require('express');
var router = express.Router();
var app = express();

var config = require('../../config');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');
var functions = require('../../functions');

app.set('models', require('../models/home.js'));
var Admin = app.get('models').admin;
var Counter = app.get('models').counter;

router.get('/', function (req, res) {
    Counter.find({where: ["id = ?", 0]}).then(function (count) {
        if (count.date.toLocaleDateString() != functions.getDate()) {
            count.date = functions.getDate();
            count.counter = 0;
        }
        count.counter++;
        count.save();
    });
    //console.log(req.cookies);
    res.render('index.ejs');
});

router.get('/login', function (req, res) {
    res.render('login.ejs');
});

router.post('/login', function (req, res) {
    // find the user
    Admin.find({where: {username: req.body.username}}).then(function (user) {
        if (!user) {
            res.json({success: false, message: 'Nie znaleziono użytkownika'});
        } else {
            // check if password matches
            bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
                if (!isMatch) {
                    res.json({success: false, message: 'Nieprawidłowe hasło'});
                } else {
                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        username: user.username,
                        admin: true
                    }, config.secret);
                    res.cookie('admin-access-token', token);
                    // new Cookies(req, res).set('admin-access-token', token, {
                    //     httpOnly: true,
                    //     secure: false     // for your production environment
                    // });
                    // return the information including token as JSON
                    var last_logged = functions.getDateTime();
                    Admin.update({
                        last_logged: last_logged
                    }, {where: {username: req.body.username}}).then(function () {
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

router.get('/logout', function (req, res) {
    // new Cookies(req, res).set('admin-access-token', '', {
    //     httpOnly: true,
    //     secure: false     // for your production environment
    // });
    res.clearCookie('admin-access-token');
    res.json({message: "Pomyślnie wylogowano."});
});

module.exports = router;